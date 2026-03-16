'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function createBooking(trainId: string, trainClassId: string, travelDate: string, passengers: { name: string; age: number; gender: string }[]) {
  const session = await getSession();
  if (!session) redirect('/login');
  const userId = session.user.id;

  // DBMS Transaction: Ensure booking and passengers are created together
  const booking = await prisma.$transaction(async (tx) => {
    // 0. Fetch Train Info for PNR generation
    const train = await tx.train.findUnique({
      where: { id: trainId },
      select: { trainNumber: true }
    });
    if (!train) throw new Error('Train not found');

    const travelDateObj = new Date(travelDate);
    const day = travelDateObj.getDate().toString().padStart(2, '0');
    
    // Generate Unique Structured PNR: [TrainNo][Day][5-Random-Digits]
    let pnrNumber = '';
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
      const randomPart = Math.floor(10000 + Math.random() * 90000).toString();
      const candidatePnr = `${train.trainNumber}${day}${randomPart}`;
      
      const existing = await tx.booking.findUnique({
        where: { pnrNumber: candidatePnr }
      });

      if (!existing) {
        pnrNumber = candidatePnr;
        isUnique = true;
      }
      attempts++;
    }

    if (!pnrNumber) throw new Error('Failed to generate unique PNR');

    // 1. Verify availability one last time (Race condition check)
    const trainClass = await tx.trainClass.findUnique({
      where: { id: trainClassId },
      include: {
        _count: {
          select: {
            bookings: {
              where: {
                travelDate: travelDateObj,
                bookingStatus: 'CONFIRMED'
              }
            }
          }
        }
      }
    });

    if (!trainClass) throw new Error('Invalid train class');
    
    // 2. Create the booking
    const newBooking = await tx.booking.create({
      data: {
        pnrNumber,
        userId,
        trainId,
        trainClassId,
        travelDate: travelDateObj,
        passengers: {
          create: passengers.map((p) => ({
            name: p.name,
            age: Number(p.age),
            gender: p.gender,
            seatNumber: Math.floor(Math.random() * trainClass.capacity) + 1,
          })),
        },
      },
    });

    return newBooking;
  });

  redirect(`/ticket/${booking.pnrNumber}`);
}

export async function getBookingByPNR(pnr: string) {
  return await prisma.booking.findUnique({
    where: { pnrNumber: pnr },
    include: {
      train: true,
      passengers: true,
      user: true,
    },
  });
}

export async function getUserBookings() {
  const session = await getSession();
  if (!session) return [];

  return await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: {
      train: true,
      passengers: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function cancelBooking(bookingId: string) {
  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      bookingStatus: 'CANCELLED',
      passengers: {
        updateMany: {
          where: { bookingId },
          data: { seatStatus: 'CANCELLED' },
        },
      },
    },
  });

  return { success: true };
}

'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

async function checkAdmin() {
  const session = await getSession();
  if (!session || session.user.role !== Role.ADMIN) {
    redirect('/');
  }
}

export async function getAllBookings() {
  await checkAdmin();
  return await prisma.booking.findMany({
    include: {
      train: true,
      user: true,
      passengers: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getAllTrains() {
  await checkAdmin();
  return await prisma.train.findMany({
    include: {
      _count: {
        select: { bookings: true }
      },
      classes: true
    },
    orderBy: { trainNumber: 'asc' },
  });
}

export async function addTrain(formData: FormData) {
  await checkAdmin();
  
  const trainNumber = formData.get('trainNumber') as string;
  const trainName = formData.get('trainName') as string;
  const sourceStation = formData.get('sourceStation') as string;
  const destinationStation = formData.get('destinationStation') as string;
  const departureTime = formData.get('departureTime') as string;
  const arrivalTime = formData.get('arrivalTime') as string;

  await prisma.train.create({
    data: {
      trainNumber,
      trainName,
      sourceStation,
      destinationStation,
      departureTime,
      arrivalTime,
      // Default classes could be added here if needed, or left for a separate management UI
    },
  });

  redirect('/admin/trains');
}

export async function deleteTrain(id: string) {
  await checkAdmin();
  await prisma.train.delete({ where: { id } });
  redirect('/admin/trains');
}

export async function getSystemStats() {
  await checkAdmin();
  const trainCount = await prisma.train.count();
  const userCount = await prisma.user.count();
  const bookingCount = await prisma.booking.count();
  const passengerCount = await prisma.passenger.count();

  return { trainCount, userCount, bookingCount, passengerCount };
}

'use server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function getStations() {
  return await prisma.station.findMany({
    orderBy: { stationName: 'asc' },
  });
}

// Define the included types for better TS support
type TrainWithDetails = Prisma.TrainGetPayload<{
  include: {
    classes: true,
    routes: {
      include: { station: true }
    },
    bookings: {
      include: {
        _count: {
          select: { passengers: true }
        }
      }
    }
  }
}>;

export async function searchTrains(sourceCode: string, destinationCode: string, date: string) {
  const sCode = sourceCode.trim().toUpperCase();
  const dCode = destinationCode.trim().toUpperCase();
  console.log(`[Search] DEBUG: Search Params -> ${sCode} to ${dCode}`);

  try {
    // 1. Broad query
    const trains = await (prisma.train as any).findMany({
      where: {
        OR: [
          {
            AND: [
              { routes: { some: { station: { stationCode: sCode } } } },
              { routes: { some: { station: { stationCode: dCode } } } }
            ]
          },
          {
            AND: [
              { sourceStation: sCode },
              { destinationStation: dCode }
            ]
          }
        ]
      },
      include: {
        classes: true,
        routes: {
          include: { station: true },
          orderBy: { stopNumber: 'asc' },
        },
        bookings: {
          where: {
            travelDate: new Date(date),
            bookingStatus: 'CONFIRMED',
          }
        }
      },
    });

    if (trains.length > 0) {
      return (trains as any[]).map(train => {
        const classesWithAvailability = train.classes.map((cls: any) => ({
          ...cls,
          availableSeats: cls.capacity // Simplified for debug - assume all available
        }));
        return { ...train, classes: classesWithAvailability };
      });
    }

    // IF NO TRAINS FOUND -> RETURN DEBUG DATA
    const allStations = await prisma.station.findMany({ select: { stationCode: true, stationName: true } });
    const totalTrainsInDb = await prisma.train.count();
    const sampleTrains = await prisma.train.findMany({ 
      take: 5, 
      select: { trainNumber: true, sourceStation: true, destinationStation: true } 
    });

    console.log(`[Search] DEBUG: No trains found for ${sCode}->${dCode}. Total in DB: ${totalTrainsInDb}`);

    return {
      _debug: {
        sentSource: sCode,
        sentDest: dCode,
        totalTrainsInDb,
        allStationCodes: allStations.map(s => s.stationCode),
        sampleTrainsInDb: sampleTrains
      }
    } as any;

  } catch (error) {
    console.error('[Search Error] DEBUG:', error);
    return [];
  }
}

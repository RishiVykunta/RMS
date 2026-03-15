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
  console.log(`[Search] DEBUG: Starting search for ${sCode} -> ${dCode} on ${date}`);

  try {
    // 1. Broadly find trains that match EITHER by route station codes OR direct fields
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
          },
          include: {
            _count: {
              select: { passengers: true }
            }
          }
        }
      },
    });

    console.log(`[Search] DEBUG: Base trains found count: ${trains.length}`);

    // mapping with simplified logic
    const result = (trains as any[]).map(train => {
      // For now, if both source and destination exist in the train's record, we show it.
      // We will calculate availability regardless of stop order for debugging.
      
      const classesWithAvailability = train.classes.map((cls: any) => {
        const classBookingsCount = train.bookings
          .filter((b: any) => b.trainClassId === cls.id)
          .reduce((sum: number, b: any) => sum + (b._count?.passengers || 0), 0);

        return {
          ...cls,
          availableSeats: cls.capacity - classBookingsCount
        };
      });

      return {
        ...train,
        classes: classesWithAvailability
      };
    });

    console.log(`[Search] DEBUG: Returning ${result.length} trains.`);
    return result;
  } catch (error) {
    console.error('[Search Error] DEBUG:', error);
    return [];
  }
}

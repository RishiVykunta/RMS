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
  console.log(`[Search] ${sCode} -> ${dCode} on ${date}`);

  try {
    const sourceStation = await prisma.station.findUnique({ where: { stationCode: sCode } });
    const destinationStation = await prisma.station.findUnique({ where: { stationCode: dCode } });

    if (!sourceStation || !destinationStation) {
      console.log(`[Search] Station not found: ${!sourceStation ? sCode : ''} ${!destinationStation ? dCode : ''}`);
      return [];
    }

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

    console.log(`[Search] Found ${trains.length} total trains matching criteria.`);

    const result = (trains as any[]).map(train => {
      const sourceRoute = train.routes.find((r: any) => r.stationId === sourceStation.id);
      const destRoute = train.routes.find((r: any) => r.stationId === destinationStation.id);
      
      if (!sourceRoute || !destRoute || sourceRoute.stopNumber >= destRoute.stopNumber) {
        return null;
      }

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
    }).filter(t => t !== null);

    console.log(`[Search] Returning ${result.length} valid trains.`);
    return result;
  } catch (error) {
    console.error('[Search Error]', error);
    return [];
  }
}

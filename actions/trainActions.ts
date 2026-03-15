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
  console.log(`[Search] Searching for ${sourceCode} -> ${destinationCode} on ${date}`);

  // 1. Find the source and destination station IDs
  const sourceStation = await prisma.station.findUnique({ where: { stationCode: sourceCode } });
  const destinationStation = await prisma.station.findUnique({ where: { stationCode: destinationCode } });

  if (!sourceStation || !destinationStation) {
    console.log(`[Search] Station not found. Source: ${sourceCode}, Dest: ${destinationCode}`);
    return [];
  }

  // 2. Find trains that pass through BOTH stations
  const trains = await prisma.train.findMany({
    where: {
      AND: [
        { routes: { some: { stationId: sourceStation.id } } },
        { routes: { some: { stationId: destinationStation.id } } }
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

  const typedTrains = trains as unknown as TrainWithDetails[];

  console.log(`[Search] Found ${typedTrains.length} trains matching route.`);

  // 3. Map trains to include calculated availability
  const result = typedTrains.map(train => {
    // Check if source stop is before destination stop
    const sourceStop = train.routes.find(r => r.stationId === sourceStation.id)?.stopNumber || 0;
    const destStop = train.routes.find(r => r.stationId === destinationStation.id)?.stopNumber || 0;
    
    // Only return if train is going in the right direction
    if (sourceStop >= destStop) return null;

    const classesWithAvailability = train.classes.map(cls => {
      const classBookingsCount = train.bookings
        .filter(b => (b as any).trainClassId === cls.id)
        .reduce((sum: number, b) => sum + (b._count?.passengers || 0), 0);

      return {
        ...cls,
        availableSeats: cls.capacity - classBookingsCount
      };
    });

    return {
      ...train,
      classes: classesWithAvailability
    };
  }).filter((t): t is NonNullable<typeof t> => t !== null);

  console.log(`[Search] returning ${result.length} trains after direction check.`);
  return result;
}

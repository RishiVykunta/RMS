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
    const trains = await prisma.train.findMany({
      where: {
        AND: [
          { routes: { some: { station: { stationCode: sCode } } } },
          { routes: { some: { station: { stationCode: dCode } } } }
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

    const results = (trains as any[]).filter(train => {
      const sourceRoute = train.routes.find((r: any) => r.station.stationCode === sCode);
      const destRoute = train.routes.find((r: any) => r.station.stationCode === dCode);
      
      return sourceRoute && destRoute && sourceRoute.stopNumber < destRoute.stopNumber;
    }).map(train => {
      const sourceRoute = train.routes.find((r: any) => r.station.stationCode === sCode)!;
      const destRoute = train.routes.find((r: any) => r.station.stationCode === dCode)!;

      // Helper to parse distance strings like "101 km" or "0"
      const parseDist = (d: string | null) => d ? parseFloat(d.replace(/[^\d.]/g, '')) || 0 : 0;
      
      const startDist = parseDist(sourceRoute.distance);
      const endDist = parseDist(destRoute.distance);
      const journeyDist = endDist - startDist;
      
      // Total distance of the train (last stop)
      const totalDist = parseDist(train.routes[train.routes.length - 1].distance) || 1; 

      const classesWithAdjustedPrices = train.classes.map((cls: any) => {
        // Calculate price based on distance and class type
        let costPerKm = 0;
        switch (cls.type) {
          case 'SLEEPER': 
            costPerKm = 0.35; // 2S
            break;
          case 'AC_3_ECONOMY': 
            costPerKm = 0.55; // 3E
            break;
          case 'AC_3_TIER': 
            costPerKm = 1.30; // 3A
            break;
          case 'AC_2_TIER': 
            costPerKm = 1.95; // 2A
            break;
          case 'AC_FIRST_CLASS': 
            costPerKm = 4.00; // 1A
            break;
          default: 
            costPerKm = 1.0; 
            break;
        }

        const adjustedPrice = Math.round(journeyDist * costPerKm);

        return {
          ...cls,
          price: adjustedPrice > 0 ? adjustedPrice : cls.price, // Fallback if distance math fails
          availableSeats: cls.capacity // Simplified
        };
      });

      return { 
        ...train, 
        classes: classesWithAdjustedPrices,
        sourceStation: sCode,
        destinationStation: dCode,
        departureTime: sourceRoute.departureTime,
        arrivalTime: destRoute.arrivalTime,
        journeyDistance: `${journeyDist} km`
      };
    });

    if (results.length > 0) {
      return results;
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

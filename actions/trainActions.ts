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

      // Calculate Duration
      const getMinutes = (timeStr: string) => {
        const [h, m] = timeStr.split(':').map(Number);
        return h * 60 + m;
      };
      
      const startMinutes = getMinutes(sourceRoute.departureTime);
      let endMinutes = getMinutes(destRoute.arrivalTime);
      const dayDiff = destRoute.day - sourceRoute.day;
      
      const totalMinutes = (endMinutes + (dayDiff * 24 * 60)) - startMinutes;
      const h = Math.floor(totalMinutes / 60);
      const m = totalMinutes % 60;
      const journeyDuration = `${h}h ${m}m`;

      return { 
        ...train, 
        classes: classesWithAdjustedPrices,
        sourceStation: sCode,
        destinationStation: dCode,
        departureTime: sourceRoute.departureTime,
        arrivalTime: destRoute.arrivalTime,
        journeyDistance: `${journeyDist} km`,
        journeyDuration
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

export async function getRunningStatus(trainNumber: string) {
  const train = await prisma.train.findUnique({
    where: { trainNumber },
    include: {
      routes: {
        include: { station: true },
        orderBy: { stopNumber: 'asc' },
      },
    },
  });

  if (!train) return null;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const getMinutes = (timeStr: string) => {
    if (timeStr === 'STARTS' || timeStr === 'ENDS') return null;
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  let lastDeparted = train.routes[0];
  let nextStation = train.routes[1];

  for (let i = 0; i < train.routes.length; i++) {
    const route = train.routes[i];
    const depMin = getMinutes(route.departureTime);
    
    if (depMin !== null && currentMinutes > depMin) {
      lastDeparted = route;
      nextStation = train.routes[i + 1] || route;
    }
  }

  return {
    trainName: train.trainName,
    lastDeparted: lastDeparted.station.stationName,
    nextStation: nextStation.station.stationName,
    expectedArrival: nextStation.arrivalTime,
    status: lastDeparted === nextStation ? 'Arrived at Destination' : `Departed ${lastDeparted.station.stationName}`,
  };
}

export async function getSeatAvailability(trainNumber: string, trainClassType: string, date: string) {
  const travelDate = new Date(date);
  const train = await prisma.train.findUnique({
    where: { trainNumber },
    include: {
      classes: {
        where: { type: trainClassType as any },
      },
      bookings: {
        where: {
          travelDate,
          trainClass: { type: trainClassType as any },
          bookingStatus: 'CONFIRMED',
        },
        include: { _count: { select: { passengers: true } } },
      },
    },
  });

  if (!train || train.classes.length === 0) return null;

  const trainClass = train.classes[0];
  const bookedSeats = train.bookings.reduce((sum, b) => sum + b._count.passengers, 0);
  const available = trainClass.capacity - bookedSeats;

  return {
    trainName: train.trainName,
    classType: trainClassType,
    available,
    total: trainClass.capacity,
  };
}

export async function getTrainSchedule(trainNumber: string) {
  return await prisma.train.findUnique({
    where: { trainNumber },
    include: {
      routes: {
        include: { station: true },
        orderBy: { stopNumber: 'asc' },
      },
    },
  });
}

export async function getPlatformLocator(trainNumber: string, stationCode: string) {
  const route = await prisma.route.findFirst({
    where: {
      train: { trainNumber },
      station: { stationCode: stationCode.toUpperCase() },
    },
    include: {
      train: true,
      station: true,
    },
  });

  if (!route) return null;

  return {
    trainName: route.train.trainName,
    stationName: route.station.stationName,
    platform: route.platform || 'Not Assigned',
  };
}

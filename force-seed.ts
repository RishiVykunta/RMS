import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Force Re-Seeding Train Data ---');

  // 1. Delete existing data in reverse order of dependencies
  await prisma.passenger.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.route.deleteMany({});
  await prisma.trainClass.deleteMany({});
  await prisma.train.deleteMany({});
  
  console.log('✅ Cleared old train data');

  // 2. Ensure MAS and HWH stations exist
  const stations = [
    { code: 'NDLS', name: 'New Delhi', city: 'Delhi' },
    { code: 'BCT', name: 'Mumbai Central', city: 'Mumbai' },
    { code: 'MAS', name: 'Chennai Central', city: 'Chennai' },
    { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata' },
    { code: 'SBC', name: 'KSR Bengaluru City', city: 'Bengaluru' },
    { code: 'RKMP', name: 'Rani Kamlapati', city: 'Bhopal' },
    { code: 'PNBE', name: 'Patna Junction', city: 'Patna' },
    { code: 'SC', name: 'Secunderabad Junction', city: 'Hyderabad' },
  ];

  for (const s of stations) {
    await prisma.station.upsert({
      where: { stationCode: s.code },
      update: { stationName: s.name, city: s.city },
      create: { stationCode: s.code, stationName: s.name, city: s.city },
    });
  }
  console.log('✅ Stations verified');

  // 3. Create fresh trains (MAS to HWH)
  const trainsData = [
    {
      trainNumber: '12842',
      trainName: 'Coromandel Express',
      sourceStation: 'MAS',
      destinationStation: 'HWH',
      departureTime: '07:00',
      arrivalTime: '11:00',
      classes: [
        { type: 'SLEEPER', capacity: 10, price: 750 },
        { type: 'AC_3_ECONOMY', capacity: 10, price: 1790 },
        { type: 'AC_3_TIER', capacity: 10, price: 1895 },
        { type: 'AC_2_TIER', capacity: 10, price: 2695 },
        { type: 'AC_FIRST_CLASS', capacity: 10, price: 4200 },
      ]
    },
    {
      trainNumber: '12840',
      trainName: 'MAS HWH SF Mail',
      sourceStation: 'MAS',
      destinationStation: 'HWH',
      departureTime: '19:00',
      arrivalTime: '23:20',
      classes: [
        { type: 'SLEEPER', capacity: 10, price: 750 },
        { type: 'AC_3_ECONOMY', capacity: 10, price: 1790 },
        { type: 'AC_3_TIER', capacity: 10, price: 1895 },
        { type: 'AC_2_TIER', capacity: 10, price: 2695 },
        { type: 'AC_FIRST_CLASS', capacity: 10, price: 4200 },
      ]
    },
    {
      trainNumber: '15627',
      trainName: 'CBE SCL Express',
      sourceStation: 'MAS',
      destinationStation: 'HWH',
      departureTime: '05:10',
      arrivalTime: '09:32',
      classes: [
        { type: 'SLEEPER', capacity: 10, price: 750 },
        { type: 'AC_3_ECONOMY', capacity: 10, price: 1790 },
        { type: 'AC_3_TIER', capacity: 10, price: 1895 },
        { type: 'AC_2_TIER', capacity: 10, price: 2695 },
        { type: 'AC_FIRST_CLASS', capacity: 10, price: 4200 },
      ]
    }
  ];

  for (const t of trainsData) {
    const train = await prisma.train.create({
      data: {
        trainNumber: t.trainNumber,
        trainName: t.trainName,
        sourceStation: t.sourceStation,
        destinationStation: t.destinationStation,
        departureTime: t.departureTime,
        arrivalTime: t.arrivalTime,
        classes: {
          create: t.classes.map(c => ({
            type: c.type as any,
            capacity: c.capacity,
            price: c.price
          }))
        }
      }
    });

    const sStation = await prisma.station.findUnique({ where: { stationCode: t.sourceStation } });
    const dStation = await prisma.station.findUnique({ where: { stationCode: t.destinationStation } });

    if (sStation && dStation) {
      await prisma.route.create({
        data: { trainId: train.id, stationId: sStation.id, stopNumber: 1, arrivalTime: t.departureTime, departureTime: t.departureTime }
      });
      await prisma.route.create({
        data: { trainId: train.id, stationId: dStation.id, stopNumber: 2, arrivalTime: t.arrivalTime, departureTime: t.arrivalTime }
      });
    }
  }

  console.log('✅ Fresh trains and routes seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Force seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

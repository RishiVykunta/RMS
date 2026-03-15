import 'dotenv/config';
import { PrismaClient, Role, TrainClassType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Seed Process ---');

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@railway.com' },
    update: {},
    create: {
      email: 'admin@railway.com',
      name: 'System Admin',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });
  console.log('✅ Admin user ready:', admin.email);

  // 2. Create Stations
  const stationData = [
    { code: 'NDLS', name: 'New Delhi', city: 'Delhi' },
    { code: 'BCT', name: 'Mumbai Central', city: 'Mumbai' },
    { code: 'MAS', name: 'Chennai Central', city: 'Chennai' },
    { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata' },
    { code: 'SBC', name: 'KSR Bengaluru City', city: 'Bengaluru' },
    { code: 'RKMP', name: 'Rani Kamlapati', city: 'Bhopal' },
    { code: 'PNBE', name: 'Patna Junction', city: 'Patna' },
    { code: 'SC', name: 'Secunderabad Junction', city: 'Hyderabad' },
  ];

  for (const s of stationData) {
    await prisma.station.upsert({
      where: { stationCode: s.code },
      update: {},
      create: {
        stationCode: s.code,
        stationName: s.name,
        city: s.city,
      },
    });
  }
  console.log('✅ Stations ready');

  // 3. Create Trains with Classes (MAS to HWH)
  const trainsData = [
    {
      trainNumber: '12842',
      trainName: 'Coromandel Express',
      sourceStation: 'MAS',
      destinationStation: 'HWH',
      departureTime: '07:00',
      arrivalTime: '11:00',
      classes: [
        { type: TrainClassType.SLEEPER, capacity: 10, price: 750 },
        { type: 'AC_3_ECONOMY' as any, capacity: 10, price: 1790 },
        { type: TrainClassType.AC_3_TIER, capacity: 10, price: 1895 },
        { type: TrainClassType.AC_2_TIER, capacity: 10, price: 2695 },
        { type: TrainClassType.AC_FIRST_CLASS, capacity: 10, price: 4200 },
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
        { type: TrainClassType.SLEEPER, capacity: 10, price: 750 },
        { type: 'AC_3_ECONOMY' as any, capacity: 10, price: 1790 },
        { type: TrainClassType.AC_3_TIER, capacity: 10, price: 1895 },
        { type: TrainClassType.AC_2_TIER, capacity: 10, price: 2695 },
        { type: TrainClassType.AC_FIRST_CLASS, capacity: 10, price: 4200 },
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
        { type: TrainClassType.SLEEPER, capacity: 10, price: 750 },
        { type: 'AC_3_ECONOMY' as any, capacity: 10, price: 1790 },
        { type: TrainClassType.AC_3_TIER, capacity: 10, price: 1895 },
        { type: TrainClassType.AC_2_TIER, capacity: 10, price: 2695 },
        { type: TrainClassType.AC_FIRST_CLASS, capacity: 10, price: 4200 },
      ]
    }
  ];

  for (const t of trainsData) {
    const train = await prisma.train.upsert({
      where: { trainNumber: t.trainNumber },
      update: {
        trainName: t.trainName,
        sourceStation: t.sourceStation,
        destinationStation: t.destinationStation,
        departureTime: t.departureTime,
        arrivalTime: t.arrivalTime,
      },
      create: {
        trainNumber: t.trainNumber,
        trainName: t.trainName,
        sourceStation: t.sourceStation,
        destinationStation: t.destinationStation,
        departureTime: t.departureTime,
        arrivalTime: t.arrivalTime,
        classes: {
          create: t.classes
        }
      }
    });

    // Ensure classes exist for existing trains too
    for (const c of t.classes) {
      await prisma.trainClass.upsert({
        where: { trainId_type: { trainId: train.id, type: c.type } },
        update: { capacity: c.capacity, price: c.price },
        create: {
          trainId: train.id,
          type: c.type,
          capacity: c.capacity,
          price: c.price,
        }
      });
    }

    // Add basic routes so search works
    const sStation = await prisma.station.findUnique({ where: { stationCode: t.sourceStation } });
    const dStation = await prisma.station.findUnique({ where: { stationCode: t.destinationStation } });

    if (sStation && dStation) {
      await prisma.route.upsert({
        where: { trainId_stationId: { trainId: train.id, stationId: sStation.id } },
        update: {},
        create: { trainId: train.id, stationId: sStation.id, stopNumber: 1, arrivalTime: t.departureTime, departureTime: t.departureTime }
      });
      await prisma.route.upsert({
        where: { trainId_stationId: { trainId: train.id, stationId: dStation.id } },
        update: {},
        create: { trainId: train.id, stationId: dStation.id, stopNumber: 2, arrivalTime: t.arrivalTime, departureTime: t.arrivalTime }
      });
    }
  }

  console.log('✅ MAS to HWH trains with classes seeded successfully');
  console.log('--- Seed Process Finished ---');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

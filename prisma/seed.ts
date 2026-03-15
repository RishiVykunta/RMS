import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Bulletproof Seed Process ---');

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@railway.com' },
    update: {},
    create: {
      email: 'admin@railway.com',
      name: 'System Admin',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });
  console.log('✅ Admin user ready');

  // 2. Clear Existing Train Data (Ensures a clean state)
  await prisma.passenger.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.route.deleteMany({});
  await prisma.trainClass.deleteMany({});
  await prisma.train.deleteMany({});
  console.log('✅ Cleared old train data');

  // 3. Create Stations
  const stations = [
    { code: 'CBE', name: 'Coimbatore Jn', city: 'Coimbatore' },
    { code: 'TUP', name: 'Tiruppur', city: 'Tiruppur' },
    { code: 'EDE', name: 'Erode Jn', city: 'Erode' },
    { code: 'SA', name: 'Salem Jn', city: 'Salem' },
    { code: 'JTJ', name: 'Jolarpettai', city: 'Jolarpettai' },
    { code: 'KPD', name: 'Katpadi Jn', city: 'Vellore' },
    { code: 'AJJ', name: 'Arakkonam Jn', city: 'Arakkonam' },
    { code: 'PER', name: 'Perambur', city: 'Chennai' },
    { code: 'OGL', name: 'Ongole', city: 'Ongole' },
    { code: 'BZA', name: 'Vijayawada Jn', city: 'Vijayawada' },
    { code: 'RJY', name: 'Rajahmundry', city: 'Rajahmundry' },
    { code: 'VSKP', name: 'Visakhapatnam', city: 'Visakhapatnam' },
    { code: 'VZM', name: 'Vizianagram Jn', city: 'Vizianagram' },
    { code: 'CHE', name: 'Srikakulam Road', city: 'Srikakulam' },
    { code: 'PSA', name: 'Palasa', city: 'Palasa' },
    { code: 'BAM', name: 'Brahmapur', city: 'Brahmapur' },
    { code: 'BALU', name: 'Balugaon', city: 'Balugaon' },
    { code: 'KUR', name: 'Khurda Road Jn', city: 'Khurda' },
    { code: 'BBS', name: 'Bhubaneswar', city: 'Bhubaneswar' },
    { code: 'CTC', name: 'Cuttack', city: 'Cuttack' },
    { code: 'JJKR', name: 'Jajpur K Road', city: 'Jajpur' },
    { code: 'BHC', name: 'Bhadrak', city: 'Bhadrak' },
    { code: 'BLS', name: 'Balasore', city: 'Balasore' },
    { code: 'KGP', name: 'Kharagpur Jn', city: 'Kharagpur' },
    { code: 'DKAE', name: 'Dankuni', city: 'Dankuni' },
    { code: 'BHP', name: 'Bolpur S Niktn', city: 'Bolpur' },
    { code: 'RPH', name: 'Rampur Hat', city: 'Rampurhat' },
    { code: 'NFK', name: 'New Farakka Jn', city: 'Farakka' },
    { code: 'MLDT', name: 'Malda Town', city: 'Malda' },
    { code: 'KNE', name: 'Kishanganj', city: 'Kishanganj' },
    { code: 'NJP', name: 'New Jalpaiguri', city: 'Siliguri' },
    { code: 'DQG', name: 'Dhupguri', city: 'Dhupguri' },
    { code: 'NCB', name: 'New Cooch Behar', city: 'Cooch Behar' },
    { code: 'NOQ', name: 'New Alipurduar', city: 'Alipurduar' },
    { code: 'KOJ', name: 'Kokrajhar', city: 'Kokrajhar' },
    { code: 'NBQ', name: 'New Bongaigaon', city: 'Bongaigaon' },
    { code: 'BPRD', name: 'Barpeta Road', city: 'Barpeta' },
    { code: 'RNY', name: 'Rangiya Jn', city: 'Rangia' },
    { code: 'KYQ', name: 'Kamakhya', city: 'Guwahati' },
    { code: 'GHY', name: 'Guwahati', city: 'Guwahati' },
    { code: 'HJI', name: 'Hojai', city: 'Hojai' },
    { code: 'LMG', name: 'Lumding Jn', city: 'Lumding' },
    { code: 'MBG', name: 'Maibong', city: 'Maibong' },
    { code: 'NHLG', name: 'New Haflong', city: 'Haflong' },
    { code: 'BPB', name: 'Badarpur Jn', city: 'Badarpur' },
    { code: 'SCL', name: 'Silchar', city: 'Silchar' },
  ];

  for (const s of stations) {
    await prisma.station.upsert({
      where: { stationCode: s.code },
      update: { stationName: s.name, city: s.city },
      create: { stationCode: s.code, stationName: s.name, city: s.city },
    });
  }
  console.log('✅ Stations ready');

  // 4. Create Train
  const coromandel = await prisma.train.create({
    data: {
      trainNumber: '12842',
      trainName: 'Coromandel Express',
      sourceStation: 'CBE',
      destinationStation: 'SCL',
      departureTime: '16:30',
      arrivalTime: '10:45',
      classes: {
        create: [
          { type: 'SLEEPER', capacity: 60, price: 950 },
          { type: 'AC_3_ECONOMY', capacity: 40, price: 1850 },
          { type: 'AC_3_TIER', capacity: 40, price: 1950 },
          { type: 'AC_2_TIER', capacity: 20, price: 2850 },
          { type: 'AC_FIRST_CLASS', capacity: 10, price: 4500 },
        ]
      }
    }
  });

  const stops = [
    { code: 'CBE', arr: 'STARTS', dep: '16:30', dur: '-', dist: '0', platform: '01', day: 1 },
    { code: 'TUP', arr: '17:10', dep: '17:12', dur: '2min', dist: '51 km', platform: '-', day: 1 },
    { code: 'EDE', arr: '17:50', dep: '17:55', dur: '5min', dist: '101 km', platform: '-', day: 1 },
    { code: 'SA', arr: '18:47', dep: '18:50', dur: '3min', dist: '164 km', platform: '-', day: 1 },
    { code: 'JTJ', arr: '20:33', dep: '20:35', dur: '2min', dist: '284 km', platform: '-', day: 1 },
    { code: 'KPD', arr: '21:40', dep: '21:55', dur: '15min', dist: '367 km', platform: '-', day: 1 },
    { code: 'AJJ', arr: '22:43', dep: '22:45', dur: '2min', dist: '428 km', platform: '-', day: 1 },
    { code: 'PER', arr: '23:35', dep: '23:40', dur: '5min', dist: '491 km', platform: '-', day: 1 },
    { code: 'OGL', arr: '04:48', dep: '04:50', dur: '2min', dist: '783 km', platform: '-', day: 2 },
    { code: 'BZA', arr: '07:20', dep: '07:30', dur: '10min', dist: '921 km', platform: '-', day: 2 },
    { code: 'RJY', arr: '09:58', dep: '10:00', dur: '2min', dist: '1070 km', platform: '-', day: 2 },
    { code: 'VSKP', arr: '13:35', dep: '13:55', dur: '20min', dist: '1271 km', platform: '-', day: 2 },
    { code: 'VZM', arr: '14:45', dep: '14:50', dur: '5min', dist: '1331 km', platform: '-', day: 2 },
    { code: 'CHE', arr: '15:38', dep: '15:40', dur: '2min', dist: '1401 km', platform: '-', day: 2 },
    { code: 'PSA', arr: '16:48', dep: '16:50', dur: '2min', dist: '1474 km', platform: '-', day: 2 },
    { code: 'BAM', arr: '17:45', dep: '17:50', dur: '5min', dist: '1548 km', platform: '-', day: 2 },
    { code: 'BALU', arr: '18:43', dep: '18:45', dur: '2min', dist: '1623 km', platform: '-', day: 2 },
    { code: 'KUR', arr: '19:45', dep: '19:55', dur: '10min', dist: '1694 km', platform: '-', day: 2 },
    { code: 'BBS', arr: '20:20', dep: '20:25', dur: '5min', dist: '1713 km', platform: '-', day: 2 },
    { code: 'CTC', arr: '20:55', dep: '21:00', dur: '5min', dist: '1741 km', platform: '-', day: 2 },
    { code: 'JJKR', arr: '21:48', dep: '21:50', dur: '2min', dist: '1813 km', platform: '-', day: 2 },
    { code: 'BHC', arr: '22:48', dep: '22:50', dur: '2min', dist: '1856 km', platform: '-', day: 2 },
    { code: 'BLS', arr: '23:37', dep: '23:39', dur: '2min', dist: '1919 km', platform: '-', day: 2 },
    { code: 'KGP', arr: '01:10', dep: '01:18', dur: '8min', dist: '2037 km', platform: '-', day: 3 },
    { code: 'DKAE', arr: '04:02', dep: '04:07', dur: '5min', dist: '2159 km', platform: '-', day: 3 },
    { code: 'BHP', arr: '06:08', dep: '06:13', dur: '5min', dist: '2290 km', platform: '-', day: 3 },
    { code: 'RPH', arr: '07:19', dep: '07:21', dur: '2min', dist: '2350 km', platform: '-', day: 3 },
    { code: 'NFK', arr: '09:23', dep: '09:25', dur: '2min', dist: '2437 km', platform: '-', day: 3 },
    { code: 'MLDT', arr: '10:25', dep: '10:35', dur: '10min', dist: '2472 km', platform: '-', day: 3 },
    { code: 'KNE', arr: '12:38', dep: '12:40', dur: '2min', dist: '2617 km', platform: '-', day: 3 },
    { code: 'NJP', arr: '14:05', dep: '14:15', dur: '10min', dist: '2704 km', platform: '-', day: 3 },
    { code: 'DQG', arr: '15:38', dep: '15:40', dur: '2min', dist: '2770 km', platform: '-', day: 3 },
    { code: 'NCB', arr: '16:38', dep: '16:43', dur: '5min', dist: '2830 km', platform: '-', day: 3 },
    { code: 'NOQ', arr: '17:00', dep: '17:02', dur: '2min', dist: '2849 km', platform: '-', day: 3 },
    { code: 'KOJ', arr: '18:05', dep: '18:07', dur: '2min', dist: '2928 km', platform: '-', day: 3 },
    { code: 'NBQ', arr: '18:50', dep: '19:00', dur: '10min', dist: '2956 km', platform: '-', day: 3 },
    { code: 'BPRD', arr: '19:45', dep: '19:47', dur: '2min', dist: '3000 km', platform: '-', day: 4 },
    { code: 'RNY', arr: '20:50', dep: '20:55', dur: '5min', dist: '3065 km', platform: '-', day: 4 },
    { code: 'KYQ', arr: '22:40', dep: '22:42', dur: '2min', dist: '3106 km', platform: '-', day: 4 },
    { code: 'GHY', arr: '22:55', dep: '23:10', dur: '15min', dist: '3112 km', platform: '-', day: 4 },
    { code: 'HJI', arr: '01:20', arr_real: '01:20', dep: '01:22', dur: '2min', dist: '3248 km', platform: '-', day: 4 },
    { code: 'LMG', arr: '02:30', dep: '02:40', dur: '10min', dist: '3293 km', platform: '-', day: 4 },
    { code: 'MBG', arr: '04:05', dep: '04:07', dur: '2min', dist: '3357 km', platform: '-', day: 4 },
    { code: 'NHLG', arr: '05:20', dep: '05:25', dur: '5min', dist: '3391 km', platform: '-', day: 4 },
    { code: 'BPB', arr: '08:30', dep: '08:45', dur: '15min', dist: '3462 km', platform: '-', day: 4 },
    { code: 'SCL', arr: '10:45', dep: 'ENDS', dur: '-', dist: '3492 km', platform: '-', day: 4 },
  ];

  for (let i = 0; i < stops.length; i++) {
    const s = stops[i];
    const station = await prisma.station.findUnique({ where: { stationCode: s.code } });
    if (station) {
      await prisma.route.create({
        data: {
          trainId: coromandel.id,
          stationId: station.id,
          stopNumber: i + 1,
          arrivalTime: s.arr,
          departureTime: s.dep,
          stopDuration: s.dur,
          distance: s.dist,
          platform: s.platform,
          day: s.day
        }
      });
    }
  }

  console.log('✅ Coromandel Express schedule seeded successfully');
  console.log('--- Seed Process Finished ---');
}

main()
  .catch((e) => {
    console.error('❌ Bulletproof Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

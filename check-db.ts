import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkData() {
  console.log('--- Database Diagnostic ---');
  
  const stations = await prisma.station.findMany();
  console.log(`Stations found: ${stations.length}`);
  stations.forEach(s => console.log(`- ${s.stationName} (${s.stationCode})`));

  const trains = await prisma.train.findMany({
    include: {
      routes: {
        include: { station: true }
      },
      classes: true
    }
  });
  console.log(`\nTrains found: ${trains.length}`);
  trains.forEach(t => {
    console.log(`\nTrain: ${t.trainName} (#${t.trainNumber})`);
    console.log(`Routes: ${t.routes.map(r => `${r.station.stationCode} (Stop ${r.stopNumber})`).join(' -> ')}`);
    console.log(`Classes: ${t.classes.map(c => c.type).join(', ')}`);
  });

  await prisma.$disconnect();
}

checkData();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const route = await prisma.route.findFirst({
    where: {
      train: { trainNumber: '12842' },
      station: { stationCode: 'VSKP' }
    }
  });
  console.log("VSKP ROUTE:", route);

  const route2 = await prisma.route.findFirst({
    where: {
      train: { trainNumber: '12842' },
      station: { stationCode: 'CHE' }
    }
  });
  console.log("CHE ROUTE:", route2);
}

main().finally(() => prisma.$disconnect());

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  const routes = await prisma.route.findMany({
    where: { station: { stationCode: 'CHE' } },
    include: { train: true, station: true }
  });
  console.log('Routes for CHE (Srikakulam Road):');
  console.dir(routes, { depth: null });
}

check().finally(() => prisma.$disconnect());

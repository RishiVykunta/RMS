import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

async function test() {
  const prisma = new PrismaClient();
  try {
    console.log('Testing connection to:', process.env.DATABASE_URL?.split('@')[1]);
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('Connection successful:', result);
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();

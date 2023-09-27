import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDb() {}

seedDb()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma
      .$disconnect()
      .then(() => console.log('Disconnected from Prisma'))
      .catch((error) =>
        console.error('Error disconnecting from Prisma:', error),
      );
  });

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.datas.createMany({
    data: [
      { term: 'Mobile Legends', interpretation: 'A popular mobile MOBA game.' },
      { term: 'Gank', interpretation: 'A strategy involving multiple players attacking one target.' },
      { term: 'Buff', interpretation: 'A temporary enhancement of a hero or skill.' },
    ],
  });
  console.log("Data seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

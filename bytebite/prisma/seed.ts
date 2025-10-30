import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create sample menu items
  const starter1 = await prisma.menuItem.create({
    data: {
      name: 'Bruschetta',
      description: 'Toasted bread topped with fresh tomatoes, basil, and a balsamic glaze.',
      price: 8.99,
      category: 'Starters',
    },
  });

  const starter2 = await prisma.menuItem.create({
    data: {
      name: 'Caprese Salad',
      description: 'Slices of fresh mozzarella, tomatoes, and basil, drizzled with olive oil.',
      price: 9.99,
      category: 'Starters',
    },
  });

  const main1 = await prisma.menuItem.create({
    data: {
      name: 'Spaghetti Carbonara',
      description: 'Classic Italian pasta with eggs, cheese, pancetta, and black pepper.',
      price: 15.99,
      category: 'Main Courses',
    },
  });

  const main2 = await prisma.menuItem.create({
    data: {
      name: 'Margherita Pizza',
      description: 'Simple and delicious pizza with tomatoes, mozzarella, and fresh basil.',
      price: 12.99,
      category: 'Main Courses',
    },
  });

  const dessert1 = await prisma.menuItem.create({
    data: {
      name: 'Tiramisu',
      description: 'Coffee-flavoured Italian dessert.',
      price: 7.99,
      category: 'Desserts',
    },
  });

  const drink1 = await prisma.menuItem.create({
    data: {
      name: 'Coca-cola',
      description: 'A classic fizzy drink.',
      price: 2.99,
      category: 'Drinks',
    },
  });

  // Create sample tables
  for (let i = 1; i <= 12; i++) {
    await prisma.table.create({
      data: {
        number: i,
        status: 'AVAILABLE',
      },
    });
  }

  console.log({ starter1, starter2, main1, main2, dessert1, drink1 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
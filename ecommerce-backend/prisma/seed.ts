import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // --- Категории ---
    const smartphoneCategory = await prisma.category.upsert({
        where: { name: 'Smartphones' },
        update: {},
        create: { name: 'Smartphones', description: 'Mobile phones' },
    });

    const laptopCategory = await prisma.category.upsert({
        where: { name: 'Laptops' },
        update: {},
        create: { name: 'Laptops', description: 'All kinds of laptops' },
    });

    const bookCategory = await prisma.category.upsert({
        where: { name: 'Books' },
        update: {},
        create: { name: 'Books', description: 'Books and literature' },
    });

    const shoesCategory = await prisma.category.upsert({
        where: { name: 'Shoes' },
        update: {},
        create: { name: 'Shoes', description: 'Footwear' },
    });

    // --- Продукты ---
    await prisma.product.createMany({
        data: [
            {
                name: 'iPhone 15 Pro',
                description: 'Latest iPhone model',
                price: 1200,
                categoryId: smartphoneCategory.id,
                stock: 100,
            },
            {
                name: 'Samsung Galaxy S24',
                description: 'Newest Samsung flagship',
                price: 1100,
                categoryId: smartphoneCategory.id,
                stock: 100,
            },
            {
                name: 'MacBook Pro',
                description: 'Powerful laptop from Apple',
                price: 2500,
                categoryId: laptopCategory.id,
                stock: 100,
            },
            {
                name: 'Clean Code',
                description: 'Software engineering book',
                price: 40,
                categoryId: bookCategory.id,
                stock: 100,
            },
            {
                name: 'Nike Air Max',
                description: 'Popular sneakers',
                price: 150,
                categoryId: shoesCategory.id,
                stock: 100,
            },
        ],
        skipDuplicates: true,
    });

    // --- Пользователи ---
    const adminPass = await bcrypt.hash('admin123', 10);
    const userPass = await bcrypt.hash('user123', 10);

    await prisma.user.createMany({
        data: [
            {
                email: 'admin@example.com',
                name: 'Admin User',
                password: adminPass,
                role: 'ADMIN',
            },
            {
                email: 'user@example.com',
                name: 'Regular User',
                password: userPass,
                role: 'USER',
            },
        ],
        skipDuplicates: true,
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


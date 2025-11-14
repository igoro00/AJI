import { PrismaClient } from "@/generated/prisma/client";

async function seed(prisma?: PrismaClient) {
	if (!prisma) {
		prisma = new PrismaClient();
	}
	const models = 4;
	let seeded = 0;

	console.log("Seeding database...");

	const categories = await prisma.category.createManyAndReturn({
		data: [{ name: "Electronics" }, { name: "Books" }, { name: "Clothing" }],
	});

	seeded++;
	console.log(`[${seeded}/${models}] Created categories`);

	await prisma.product.createMany({
		data: [
			{
				name: "Smartphone",
				price: 699,
				description: "A cool smartphone",
				weight: 0.4,
				categoryId: categories[0].id,
			},
			{
				name: "Laptop",
				price: 999,
				description: "A powerful laptop",
				weight: 2.5,
				categoryId: categories[0].id,
			},
			{
				name: "T-Shirt",
				price: 19.99,
				description: "A stylish t-shirt",
				weight: 0.2,
				categoryId: categories[2].id,
			},
            {
                name: "Novel Book",
                price: 14.99,
                description: "An interesting novel",
                weight: 0.5,
                categoryId: categories[1].id,
            },
		],
	});
	seeded++;
	console.log(`[${seeded}/${models}] Created products`);

    const orders = await prisma.order.createManyAndReturn({
        data: [
            {
                userName: "John Doe",
                userEmail: "john.doe@example.com",
                userPhone: "123-456-7890",
                status: "UNCONFIRMED",
            },
            {
                userName: "Jane Smith",
                userEmail: "jane.smith@example.com",
                userPhone: "987-654-3210",
                status: "CANCELED",
            },
        ],
    });
    seeded++;
    console.log(`[${seeded}/${models}] Created orders`);

    await prisma.orderItem.createMany({
        data: [
            {
                orderId: orders[0].id,
                productId: (await prisma.product.findFirst({ where: { name: "Smartphone" } }))!.id,
                quantity: 1,
            },
            {
                orderId: orders[0].id,
                productId: (await prisma.product.findFirst({ where: { name: "Novel Book" } }))!.id,
                quantity: 2,
            },
            {
                orderId: orders[1].id,
                productId: (await prisma.product.findFirst({ where: { name: "T-Shirt" } }))!.id,
                quantity: 3,
            },
        ],
    });
    seeded++;
    console.log(`[${seeded}/${models}] Created order items`);

	console.log("Seeding finished.");

	await prisma.$disconnect();
}

export { seed };

if (require.main === module) {
	console.log("Running seed script directly...");
	// This file is being run directly
	seed();
}

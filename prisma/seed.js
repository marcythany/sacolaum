import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('Seeding database with products from EscuelaJS API...');

	try {
		// Fetch products from external API
		const response = await fetch('https://api.escuelajs.co/api/v1/products');
		const products = await response.json();

		console.log(`Fetched ${products.length} products from external API`);

		// Map and insert products
		const productsToInsert = products.map((product) => ({
			id: product.id,
			name: product.title,
			price: product.price,
			image:
				product.images && product.images.length > 0 ? product.images[0] : '',
			fetchedAt: new Date(),
		}));

		// Use createMany for bulk insert
		await prisma.product.createMany({
			data: productsToInsert,
			skipDuplicates: true, // Skip if product with same id already exists
		});

		console.log(`Successfully seeded ${productsToInsert.length} products`);
	} catch (error) {
		console.error('Error seeding database:', error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

main();

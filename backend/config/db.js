import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: process.env.DATABASE_URL,
		},
export default prisma;
	},
});

export const connectDB = async () => {
	try {
		await prisma.$connect();
		console.log('Neon PostgreSQL Connected via Prisma');

		// Test query
		await prisma.$queryRaw`SELECT 1`;
		console.log('Database connection verified');
	} catch (error) {
		console.error(`Neon Connection Error: ${error.message}`);
		process.exit(1);
	}
};

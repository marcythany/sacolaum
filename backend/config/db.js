import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectDB = async () => {
	try {
		await prisma.$connect();
		console.log('PostgreSQL Connected via Prisma');
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default prisma;

// Product model is now defined in Prisma schema
// This file is kept for compatibility but uses Prisma client
import prisma from '../config/db.js';

export const createProduct = async (data) => {
	return await prisma.product.create({ data });
};

export const getAllProducts = async () => {
	return await prisma.product.findMany({
		orderBy: { createdAt: 'desc' },
	});
};

export const getProductById = async (id) => {
	return await prisma.product.findUnique({
		where: { id: parseInt(id) },
	});
};

export const updateProduct = async (id, data) => {
	return await prisma.product.update({
		where: { id: parseInt(id) },
		data,
	});
};

export const deleteProduct = async (id) => {
	return await prisma.product.delete({
		where: { id: parseInt(id) },
	});
};

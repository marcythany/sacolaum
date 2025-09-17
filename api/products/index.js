import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const products = await prisma.product.findMany({
					orderBy: { createdAt: 'desc' },
				});
				res.status(200).json({ success: true, data: products });
			} catch (error) {
				console.log('erro em carregar produtos:', error.message);
				res.status(500).json({ success: false, message: 'Erro no servidor' });
			}
			break;

		case 'POST':
			const product = req.body;
			if (!product.name || !product.price || !product.image) {
				return res.status(400).json({
					success: false,
					message: 'Por favor, preencha todos os campos',
				});
			}
			try {
				const newProduct = await prisma.product.create({ data: product });
				res.status(201).json({ success: true, data: newProduct });
			} catch (error) {
				console.error('Erro ao criar produto:', error.message);
				res.status(500).json({ success: false, message: 'Erro no servidor' });
			}
			break;

		case 'PUT':
			const { id } = req.query;
			const updateData = req.body;
			try {
				const updatedProduct = await prisma.product.update({
					where: { id: parseInt(id) },
					data: updateData,
				});
				res.status(200).json({ success: true, data: updatedProduct });
			} catch (error) {
				if (error.code === 'P2025') {
					return res
						.status(404)
						.json({ success: false, message: 'Produto não encontrado' });
				}
				res.status(500).json({ success: false, message: 'Erro no servidor' });
			}
			break;

		case 'DELETE':
			const { id: deleteId } = req.query;
			try {
				await prisma.product.delete({
					where: { id: parseInt(deleteId) },
				});
				res.status(200).json({ success: true, message: 'Produto deletado' });
			} catch (error) {
				if (error.code === 'P2025') {
					return res
						.status(404)
						.json({ success: false, message: 'Produto não encontrado' });
				}
				console.log('erro ao deletar produto:', error.message);
				res.status(500).json({ success: false, message: 'Erro no servidor' });
			}
			break;

		default:
			res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

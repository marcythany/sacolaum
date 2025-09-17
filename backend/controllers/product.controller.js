import {
	getAllProducts,
	createProduct,
	getProductById,
	updateProduct,
	deleteProduct,
} from '../models/product.model.js';

export const getProducts = async (req, res) => {
	try {
		const products = await getAllProducts();
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log('erro em carregar produtos:', error.message);
		res.status(500).json({ success: false, message: 'Erro no servidor' });
	}
};

export const createProductController = async (req, res) => {
	const product = req.body; // user will send this data

	if (!product.name || !product.price || !product.image) {
		return res
			.status(400)
			.json({ success: false, message: 'Por favor, preencha todos os campos' });
	}

	try {
		const newProduct = await createProduct(product);
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error('Erro ao criar produto:', error.message);
		res.status(500).json({ success: false, message: 'Erro no servidor' });
	}
};

export const updateProductController = async (req, res) => {
	const { id } = req.params;
	const product = req.body;

	try {
		const updatedProduct = await updateProduct(id, product);
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		if (error.code === 'P2025') {
			return res
				.status(404)
				.json({ success: false, message: 'Produto não encontrado' });
		}
		res.status(500).json({ success: false, message: 'Erro no servidor' });
	}
};

export const deleteProductController = async (req, res) => {
	const { id } = req.params;

	try {
		await deleteProduct(id);
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
};

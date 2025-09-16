import { create } from 'zustand';

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: 'Por favor, preencha todos os campos' };
		}
		// Mock data - simulate success without actual API call
		return {
			success: false,
			message:
				'Criação de produtos não suportada com dados mock. Use a API local para operações completas.',
		};
	},
	fetchProducts: async () => {
		const res = await fetch('https://api.escuelajs.co/api/v1/products');
		const data = await res.json();
		// Map Platzi API data to local format
		const mappedProducts = data.map((product) => ({
			_id: product.id,
			name: product.title,
			price: product.price,
			image: product.images[0] || product.images,
		}));
		set({ products: mappedProducts });
	},
	deleteProduct: async () => {
		// Mock data - simulate success without actual API call
		return {
			success: false,
			message:
				'Exclusão de produtos não suportada com dados mock. Use a API local para operações completas.',
		};
	},
	updateProduct: async () => {
		// Mock data - simulate success without actual API call
		return {
			success: false,
			message:
				'Atualização de produtos não suportada com dados mock. Use a API local para operações completas.',
		};
	},
}));

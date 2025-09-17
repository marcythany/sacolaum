import { create } from 'zustand';

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: 'Por favor, preencha todos os campos' };
		}
		const res = await fetch('/api/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		return data;
	},
	fetchProducts: async () => {
		const res = await fetch('/api/products');
		const data = await res.json();
		if (data.success) {
			set({ products: data.data });
		}
	},
	deleteProduct: async (pid) => {
		const res = await fetch(`/api/products?id=${pid}`, {
			method: 'DELETE',
		});
		const data = await res.json();
		return data;
	},
	updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`/api/products?id=${pid}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		return data;
	},
}));

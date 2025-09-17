import { create } from 'zustand';

const API_BASE =
	import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL !== ''
		? import.meta.env.VITE_API_BASE_URL
		: import.meta.env.DEV
		? 'http://localhost:8080'
		: '';

export const useProductStore = create((set, get) => ({
	products: [],
	currentPage: 1,
	totalPages: 1,
	isLoading: false,
	setProducts: (products) => set({ products }),
	setCurrentPage: (page) => set({ currentPage: page }),
	setTotalPages: (total) => set({ totalPages: total }),
	setLoading: (loading) => set({ isLoading: loading }),
	getPaginatedProducts: () => {
		const state = get();
		const startIndex = (state.currentPage - 1) * 10;
		const endIndex = startIndex + 10;
		return state.products.slice(startIndex, endIndex);
	},
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: 'Por favor, preencha todos os campos' };
		}
		const res = await fetch(`${API_BASE}/api/products`, {
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
		set({ isLoading: true });
		try {
			const res = await fetch(`${API_BASE}/api/products`);
			const data = await res.json();
			if (data.success) {
				const allProducts = data.data;
				const totalPages = Math.ceil(allProducts.length / 10);
				set({
					products: allProducts,
					totalPages,
					currentPage: 1,
					isLoading: false,
				});
			}
		} catch (error) {
			console.error('Error fetching products:', error);
			set({ isLoading: false });
		}
	},
	deleteProduct: async (pid) => {
		const res = await fetch(`${API_BASE}/api/products?id=${pid}`, {
			method: 'DELETE',
		});
		const data = await res.json();
		return data;
	},
	updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`${API_BASE}/api/products?id=${pid}`, {
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

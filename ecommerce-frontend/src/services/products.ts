import api from './api';
import { Product, ProductFilters, ForecastData } from '../types';

export const productService = {
    getProducts: async (filters: ProductFilters = {}) => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, value.toString());
            }
        });

        const response = await api.get(`/products?${params}`);
        return response.data;
    },

    getProduct: async (id: number): Promise<Product> => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    getCategories: async () => {
        const response = await api.get('/products/categories');
        return response.data;
    },

    searchProducts: async (term: string) => {
        const response = await api.get(`/products/search/${term}`);
        return response.data;
    },

    getForecast: async (): Promise<ForecastData[]> => {
        const response = await api.get('/products/forecast');
        return response.data;
    },

    // Admin methods
    createProduct: async (productData: FormData): Promise<Product> => {
        const response = await api.post('/products', productData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    updateProduct: async (id: number, productData: FormData): Promise<Product> => {
        const response = await api.patch(`/products/${id}`, productData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    deleteProduct: async (id: number): Promise<void> => {
        await api.delete(`/products/${id}`);
    },

    // Category management
    createCategory: async (categoryData: { name: string; description?: string }) => {
        const response = await api.post('/products/categories', categoryData);
        return response.data;
    }
};
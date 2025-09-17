import api from './api';
import { CartItem } from '../types';

export const cartService = {
    getCart: async (): Promise<CartItem[]> => {
        const response = await api.get('/cart');
        return response.data;
    },

    addToCart: async (productId: number, quantity: number = 1): Promise<CartItem> => {
        const response = await api.post('/cart', { productId, quantity });
        return response.data;
    },

    updateCartItem: async (productId: number, quantity: number): Promise<CartItem> => {
        // Поскольку нет PATCH эндпоинта, сначала удаляем, потом добавляем с новым количеством
        await api.delete(`/cart/${productId}`);
        const response = await api.post('/cart', { productId, quantity });
        return response.data;
    },

    removeFromCart: async (productId: number): Promise<void> => {
        await api.delete(`/cart/${productId}`);
    },

    clearCart: async (): Promise<void> => {
        await api.delete('/cart');
    }
};
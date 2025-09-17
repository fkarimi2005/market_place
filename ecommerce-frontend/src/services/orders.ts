import api from './api';
import { Order } from '../types';

export const orderService = {
    createOrder: async (): Promise<Order> => {
        const response = await api.post('/orders');
        return response.data;
    },

    getOrders: async (): Promise<Order[]> => {
        const response = await api.get('/orders');
        return response.data;
    },

    getOrder: async (id: number): Promise<Order> => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    // Admin methods
    getAllOrders: async (): Promise<Order[]> => {
        const response = await api.get('/orders/admin/all');
        return response.data;
    },

    updateOrderStatus: async (id: number, status: string): Promise<Order> => {
        const response = await api.patch(`/orders/admin/${id}/status`, { status });
        return response.data;
    }
};
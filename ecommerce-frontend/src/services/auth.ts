import api from './api';
import { LoginData, RegisterData, User } from '../types';

export const authService = {
    login: async (data: LoginData): Promise<{ token: string; user: User }> => {
        const response = await api.post('/auth/login', data);
        const payload = response.data;
        return { token: payload.accessToken, user: payload.user };
    },

    register: async (data: RegisterData): Promise<{ token: string; user: User }> => {
        const response = await api.post('/auth/register', data);
        const payload = response.data;
        return { token: payload.accessToken, user: payload.user };
    },

    getProfile: async (): Promise<User> => {
        const response = await api.get('/users/profile');
        return response.data;
    },

    logout: (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
};
import api from './api';

export const adminService = {
    // Add admin-specific API calls here
    getStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data;
    },
};

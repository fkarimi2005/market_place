import axios from 'axios';

function resolveApiBaseUrl(): string {
    const envUrl = process.env.REACT_APP_API_URL;
    if (envUrl && envUrl.trim().length > 0) return envUrl.trim();
    if (typeof window !== 'undefined') {
        const { protocol, hostname } = window.location;
        // Assume backend on 3001 on same host by default
        return `${protocol}//${hostname}:3001`;
    }
    return 'http://localhost:3001';
}

const API_BASE_URL = resolveApiBaseUrl();

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Добавляем токен к запросам
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Обрабатываем ошибки авторизации
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Do not force-redirect or clear storage here; let app state handle it.
        const message = error?.response?.data?.message || error?.message || 'Request failed';
        return Promise.reject({ ...error, normalizedMessage: message });
    }
);

export default api;
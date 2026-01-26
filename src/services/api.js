import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // untuk keperluan sanctum
})

export default api;

// Export axios instance tanpa baseURL untuk CSRF cookie
export const axiosBase = axios.create({
    baseURL: import.meta.env.VITE_APP_URL || 'http://localhost:8000',
    withCredentials: true,
})
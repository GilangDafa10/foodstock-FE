import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

// --- INTERCEPTOR (PENTING!) ---
api.interceptors.request.use(config => {
    // Cek apakah ada token di LocalStorage
    const token = localStorage.getItem('auth_token');

    // Jika ada, tambahkan ke Header Authorization
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
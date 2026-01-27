import api from './api'

// export const csrf = () => axiosBase.get('/sanctum/csrf-cookie')

export const login = (payload) =>
    api.post('/login', payload)

export const register = (payload) =>
    api.post('/register', payload)

export const logout = () =>
    api.post('/logout')

export const me = () =>
    api.get('/me')

import api from "./api";

export const csrfCookie = () => api.get("/sanctum/csrf-cookie");

export const login = (credentials) => api.post('/auth/login', credentials)

export const register = (user) => api.post('/api/auth/register', user)

export const logout = () => api.post('/auth/logout')

export const getUser = () => api.get('/api/v1/user')

export const test = () => api.get('/api/test')



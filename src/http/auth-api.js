import api from "./api";

export const csrfCookie = () => api.get("/sanctum/csrf-cookie");

export const login = (credentials) => api.post('/auth/login', credentials)

export const register = (user) => api.post('/api/auth/register', user)

export const logout = () => api.post('/auth/logout')

export const getUser = () => api.get('/api/v1/users/user')

export const test = () => api.get('/api/test')

export const getEvaluateesToRate = (userId) => api.post(`api/v1/users/${userId}/evaluatees-to-rate`)
// export const getEvaluateesToRate = (user) => api.post("api/v1/users/evaluatees-to-rate",user)


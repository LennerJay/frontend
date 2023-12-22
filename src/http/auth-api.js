import api from "./api";

export const csrfCookie = () => api.get("/sanctum/csrf-cookie");

// export const login = (credentials) => api.post('/auth/login', credentials)
export const login = (credentials) => api.post('api/auth/login', credentials)

export const logout = () => api.post('api/auth/logout')

export const getUser = () => api.get('/api/v1/users/user')

export const getUserInfo = () => api.post('/api/v1/user-infos')

export const storeUserInfo = (data) => api.post('/api/v1/user-infos/store',data)


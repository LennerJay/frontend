import axios from "axios";

axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL

})
api.interceptors.request.use((config) => {
    if(localStorage.getItem('jwt_token')){
        const token = localStorage.getItem('jwt_token').split('.')[0];
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});


export default api
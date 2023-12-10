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
    // console.log(error)
    return Promise.reject(error);
});
api.interceptors.response.use((response) => {

    if(response.config.url == 'api/auth/logout'){
        window.location.href = '/login';
    }
    return response;
}, (error) => {
    if(error.response.status == 401){
        localStorage.removeItem('jwt_token')
        window.location.href = '/login';
    }
    // console.log(error)
    return Promise.reject(error);
});






export default api
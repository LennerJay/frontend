import api from './api'

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/rating"



export const saveRatings = (value) => api.post(resource,value)
import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/entities"



export const getAllEntity = ()=> api.get(resource)
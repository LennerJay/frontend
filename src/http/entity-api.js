import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/entity"



export const getAllEntity = ()=> api.get(resource)
import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/entities"



export const getAllEntity = ()=> api.get(resource)

export const addEntity = (data)=> api.post(resource,data)

export const deleteEntity = (id)=> api.delete(resource + `/${id}`);

export const updateEntity = (id,data)=> api.put(resource + `/${id}`,data);

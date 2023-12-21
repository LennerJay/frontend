import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + "/criterias"

export const getAllCriteria = ()=> api.get(resource)

export const addCriteria = (data)=> api.post(resource,data)

export const deleteCriteria = (id)=> api.delete(resource + `/${id}`);

export const updateCriteria = (id,data)=> api.put(resource + `/${id}`,data);

import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/section-year"


export const getAllSectionYear = ()=> api.get(resource)

export const addSectionYear = (data)=> api.post(resource,data);

export const removeSectionYear = (id)=> api.delete(resource + `/${id}`)

export const updateSectionYear = (id,data)=> api.put(resource + `/${id}`,data)


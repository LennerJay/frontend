import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/departments"


export const getAllDepartments = () => api.get(resource)

export const addDepartment = (data) => api.post(resource,data)

export const deleteDepartment = (id) => api.delete(resource+ `/${id}`)

export const updateDepartment = (id,data) => api.put(resource+ `/${id}`,data)
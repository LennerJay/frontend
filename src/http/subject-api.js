import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/subjects"


export const  getAllSubjects = () => api.get(resource)

export const saveSubjects = (data) => api.post(resource,data)

export const deleteSubject = (id) => api.delete(resource+ `/${id}`)

export const updateSubject = (id,data) => api.put(resource + `/${id}`,data)


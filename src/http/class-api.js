import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/class"

export const addClass = (data) => api.post(resource + '/store',data)

export const deleteClass = (data) => api.delete(resource + '/delete',data)
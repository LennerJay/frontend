import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH

const resource = apiPath +  "/roles"

export const getAllRoles = () => api.get(resource)
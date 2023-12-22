import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH

const resource = apiPath +  "/users"

export const getAllUsers = () => api.get(resource)

export const changePassword = (data)=> api.post(resource + "/change-password",data)

export const addUsers = (data) => api.post(resource,data)

export const deleteUser = (id) => api.delete(resource + `/${id}`)

export const resetPassword = (id) => api.post(resource + `/${id}/reset-password`)

export const fetchUserInfo = (data) => api.post(apiPath +"/user-infos",data);

export const storeUserInfo = (data) => api.post(apiPath +"/user-infos",data);

export const deleteUserInfo = (id) => api.delete(apiPath +`/user-infos/${id}`);
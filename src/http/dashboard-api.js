import api from "./api";
const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/dashboard"


export const getAdminDashboardData = ()=> api.get(resource + '/admin')


export const getUserDashboardData = ()=> api.get(resource + '/user')
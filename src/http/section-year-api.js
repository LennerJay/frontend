import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/section-year"


export const getAllSectionYear = ()=> api.get(resource)


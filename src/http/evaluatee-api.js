import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/evaluatees"

export const getAllEvaluatees = () => api.get(resource)

export const getAllEvaluated = user => api.post(resource + "/evaluated",user)

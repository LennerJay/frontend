import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/evaluatees"

export const getAllEvaluatees = () => api.get(resource)

export const getAllEvaluated = user => api.post(apiPath + "/evaluated",user)

export const getAllNotYetEvaluated = user => api.post(apiPath + "/notyetevaluated",user)
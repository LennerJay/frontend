import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/evaluatees"

export const getAllEvaluatees = () => api.get(resource)

export const getAllEvaluated = user => api.post(resource + "/evaluated",user)

export const getEvaluateeInfo = (evaluateeId) => api.post(resource + "/evaluatee-info",evaluateeId)

export const getEvaluateesToRate = (userId) => api.post(resource + `/${userId}/evaluatees-to-rate`)

export const deleteEvaluatee = (evaluateeId) => api.delete(resource + `/${evaluateeId}`);




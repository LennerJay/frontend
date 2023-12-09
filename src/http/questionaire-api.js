import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + "/questionaires"

export const allQuestionaires = () => api.get(resource)

export const getLatestQuestionaire = ()=> api.get(resource + '/latest')

export const getQuestionaireForEvaluatee = (ids)=> api.post(resource + '/for-evaluatee',ids)

export const getMaxRespondents = ()=> api.get(resource + '/max-respondents');
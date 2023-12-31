import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + "/questionaires"

export const allQuestionaires = () => api.get(resource)

export const getLatestQuestionaire = ()=> api.get(resource + '/latest')

export const getQuestionaireForEvaluatee = (ids)=> api.post(resource + '/for-evaluatee',ids)

export const getMaxRespondents = ()=> api.get(resource + '/max-respondents');

export const updateQuestionaire = (questionaireId,data)=> api.put(resource +`/${questionaireId}`, data)

export const updateStatusQuestionaire = (questionaireId)=> api.patch(resource +`/${questionaireId}/update-status`)

export const deleteQuestionaire = (questionaireId)=> api.delete(resource +`/${questionaireId}`)

export const AddQuestionaire = (datas) =>api.post(resource,datas)

export const getCriteriasWithQuestions = (id) => api.get(resource + `/${id}/with-criterias`)

export const removeCriteria = (id,data)=>api.post(resource + `/${id}/remove-criterias`,data)

export const attachCriteria = (id,data)=>api.post(resource + `/${id}/attach-criterias`,data)
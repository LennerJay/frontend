import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + "/questions"

export const createQuestion = (data)=> api.post(resource,data)

export const fetchQuestionByCriteria = (data) => api.post(resource+'/by-criteria',data)

export const deleteQuestion = (id)=> api.delete(resource + `/${id}`)

export const updateQuestion = (id,data)=> api.put(resource + `/${id}` ,data)


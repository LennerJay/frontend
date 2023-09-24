import api from "./api";

const resource = '/questionaire'

export const allQuestionaires = () => api.get(resource)


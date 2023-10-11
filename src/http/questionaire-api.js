import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath+  '/questionaire'

export const allQuestionaires = () => api.get(resource)


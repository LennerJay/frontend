import api from './api'

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/ratings"



export const saveRatings = (value) => api.post(resource,value)

export const fetchRatingsSummary = (value)=>api.post(resource + "/summary",value)

export const getOutComeRatings = (value)=> api.post(resource + "/outcomes",value)

export const fetchRatingInfo = (value)=> api.post(resource + "/rating-info",value)
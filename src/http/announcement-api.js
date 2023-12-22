import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath +  "/announcements"

export const fetchAllAnouncements = ()=> api.get(resource)

export const fetchLatestAnouncement = ()=> api.get(resource + "/latest")

export const addAnouncement = (data)=> api.post(resource,data)

export const updateAnnouncement = (id,data)=> api.put(resource + `/${id}`,data)

export const deleteAnnouncement = (id)=> api.delete(resource + `/${id}`)

export const updateStatusAnnouncement = (id)=> api.post(resource + `${id}/update-status`)
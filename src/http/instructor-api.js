import api from "./api";

const resource = "/instructors"

export const allInstructors = () => api.get(resource)
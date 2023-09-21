import {  defineStore } from "pinia";
import { ref } from "vue";
import { allInstructors } from "../http/instructor-api"



export const useInstructorStore = defineStore('instructionStore',() =>{
    const instructors = ref([]);
    const fetchAllInstructors = async () =>{
        const { data } = await allInstructors();
        instructors.value = data
    }
    const filterDepartment = course => instructors.value.filter(e =>e.department === course)
    
    return {
        fetchAllInstructors, instructors,filterDepartment
    }
})
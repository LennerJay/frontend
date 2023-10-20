import {  defineStore } from "pinia";
import { ref, watch } from "vue";
import { allInstructors } from "../http/instructor-api"


export const useInstructorStore = defineStore('instructionStore',() =>{
    const instructors = ref([]);

    const fetchAllInstructors = async () =>{
        const { data } = await allInstructors();
        instructors.value = data
    }

    if(localStorage.getItem('instructors')){
        instructors.value = JSON.parse(localStorage.getItem('instructors'))
    }

    watch(
        instructors,
        (instructorsVal)=>{
            localStorage.setItem('instructors', JSON.stringify(instructorsVal))
        },
        {
            deep:true
        }
    );

    const filterDepartment = course => instructors.value.filter(e =>e.department === course)
    

    return {
        fetchAllInstructors, instructors,filterDepartment
    }
})
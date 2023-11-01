import {  defineStore } from "pinia";
import { ref, watch } from "vue";
import { getAllEvaluatees } from "../http/evaluatee-api"


export const useInstructorStore = defineStore('instructionStore',() =>{
    const instructors = ref([]);

    const fetchAllInstructors = async () =>{
        const { data } = await getAllEvaluatees();
        console.log(data)
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

    const filterDepartment = (course)=>{
        return instructors.value.filter((instructor)=>{
            return instructor.departments.some(department => department.department === course)
        })
    }
    

    return {
        fetchAllInstructors, instructors,filterDepartment
    }
})
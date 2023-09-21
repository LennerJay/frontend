import {  defineStore } from "pinia";
import { ref } from "vue";
import { allInstructors } from "../http/instructor-api"



export const useInstructorStore = defineStore('instructionStore',() =>{
    const instructors = ref([]);
    const test = 'test';

    const fetchAllInstructors = async () =>{
        const { data } = await allInstructors();
        instructors.value = data
    }
    return {
        fetchAllInstructors, instructors, test
    }
})
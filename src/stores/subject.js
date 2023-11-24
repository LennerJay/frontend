import { defineStore } from "pinia";
import { ref ,watch} from "vue";
import { getAllSubjects } from "../http/subject-api"

export const useSubjectStore = defineStore('subjectStore',()=>{
    const subjects = ref([])



    if(localStorage.getItem('subjects')){
        subjects.value = JSON.parse(localStorage.getItem('subjects'))
    }
    watch(
        subjects,
        function(subjectVal){
            localStorage.setItem('subjects', JSON.stringify(subjectVal))
        },
        {
            deep: true,
        }
    )
    const fetchAllSubjects = async()=>{
        const { data } = await getAllSubjects()
        console.log(data)
        subjects.value = data
    }
    return {
        subjects,
        fetchAllSubjects,
    }
});
import {  defineStore } from "pinia";
import { ref, watch } from "vue";
import { getAllEvaluatees} from "../http/evaluatee-api"


export const useEvaluateeStore = defineStore('evaluateeStore',() =>{
    const error = ref([]);
    const allEvaluatees = ref([]);
    const allEvaluated = ref([]);

    const fetchAllEvaluatees = async (userId) =>{
        try{
            const { data } = await getAllEvaluatees(userId);
            allEvaluatees.value = data
            error.value = []
        }catch(e){
            allEvaluatees.value = []
            error.value = e.response
        }
    }
    

    if(localStorage.getItem('allEvaluatees')){
        allEvaluatees.value = JSON.parse(localStorage.getItem('allEvaluatees'))
    }

    watch(
        allEvaluatees,
        (evaluateesVal)=>{
            localStorage.setItem('allEvaluatees', JSON.stringify(evaluateesVal))
        },
        {
            deep:true
        }
    );

    const filterDepartment = (course)=>{
        return allEvaluatees.value.filter((evaluatee)=>{
            return evaluatee.departments.some(department => department.department === course)
        })
    }
    

    return {
        fetchAllEvaluatees, allEvaluatees,filterDepartment, allEvaluated
    }
})
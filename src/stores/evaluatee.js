import {  defineStore } from "pinia";
import { ref, watch } from "vue";
import { getAllEvaluatees, getAllEvaluated } from "../http/evaluatee-api"


export const useEvaluateeStore = defineStore('evaluateeStore',() =>{
    const evaluatees = ref([]);
    const evaluated = ref([]);


    const fetchAllEvaluated = async (userId) =>{
      
        const user  = {user_id: userId}
        const { data } = await getAllEvaluated(user);
        console.log(data)
        evaluated.value = data
    };

    const fetchAllEvaluatees = async () =>{
        const { data } = await getAllEvaluatees();
        console.log(data)
        evaluatees.value = data
    }

    if(localStorage.getItem('evaluatees')){
        evaluatees.value = JSON.parse(localStorage.getItem('evaluatees'))
    }

    watch(
        evaluatees,
        (evaluateesVal)=>{
            localStorage.setItem('evaluatees', JSON.stringify(evaluateesVal))
        },
        {
            deep:true
        }
    );

    const filterDepartment = (course)=>{
        return evaluatees.value.filter((evaluatee)=>{
            return evaluatee.departments.some(department => department.department === course)
        })
    }
    

    return {
        fetchAllEvaluated,fetchAllEvaluatees, evaluatees,filterDepartment, evaluated
    }
})
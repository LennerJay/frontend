import {  defineStore } from "pinia";
import { ref, watch } from "vue";
import { getAllEvaluatees, getAllEvaluated ,getAllNotYetEvaluated} from "../http/evaluatee-api"


export const useEvaluateeStore = defineStore('evaluateeStore',() =>{
    const error = ref([]);
    const evaluatees = ref([]);
    const evaluated = ref([]);
    const notYetEvaluated = ref([]);

    const fetchAllEvaluated = async (userId) =>{
        try{
            const user  = {user_id: userId}
            const { data } = await getAllEvaluated(user);
            evaluated.value = data
        } catch(e){
            evaluated.value = null;
            error.value = e.response
        }
    };

    const fetchALLNotYetEvaluated = async (userId) =>{
        const user  = {user_id: userId}
        const { data } = await getAllNotYetEvaluated(user);
        console.log(data)
        notYetEvaluated.value = data
    }

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
        fetchALLNotYetEvaluated,fetchAllEvaluated,fetchAllEvaluatees, evaluatees,filterDepartment, evaluated
    }
})
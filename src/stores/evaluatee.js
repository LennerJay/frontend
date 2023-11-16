import {  defineStore } from "pinia";
import { ref, watch } from "vue";
import { getAllEvaluatees,getEvaluateesToRate,getEvaluateeInfo} from "../http/evaluatee-api"


export const useEvaluateeStore = defineStore('evaluateeStore',() =>{
    const error = ref([]);
    const allEvaluatees = ref([]);
    const allEvaluated = ref([]);
    const evaluateesToRate = ref({})

    const fetchEvaluateeInfo = async(evaluateeId)=>{
        const id = {
            evaluatee_id: evaluateeId
        }
        const {data} = await getEvaluateeInfo(id)
 
        return data;
    }

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
    
    const fetchEvaluateesToRate = async(userId)=>{
        const { data } = await getEvaluateesToRate(userId)
        evaluateesToRate.value = data
      }
    
      const filterEvaluatees = (isDone) => {
        if(!isDone){
          return evaluateesToRate.value.filter(evaluatee => evaluatee.pivot.is_done === 0)
        }
  
        return evaluateesToRate.value.filter(evaluatee => evaluatee.pivot.is_done === 1)
      }

    return {
        fetchAllEvaluatees,
         allEvaluatees,
         filterDepartment, 
         allEvaluated,
         fetchEvaluateesToRate,
         evaluateesToRate,
         filterEvaluatees,
         fetchEvaluateeInfo
    }
})
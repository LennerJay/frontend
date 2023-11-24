import {  defineStore } from "pinia";
import { ref, watch } from "vue";
import { getAllEvaluatees,getEvaluateesToRate,getEvaluateeInfo,deleteEvaluatee , storeEvaluatee} from "../http/evaluatee-api"
import { csrfCookie } from "../http/auth-api"

export const useEvaluateeStore = defineStore('evaluateeStore',() =>{
    const status = ref([]);
    const errors = ref([]);
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
            errors.value = []
        }catch(e){

            allEvaluatees.value = []
            errors.value = e.response
            console.log(errors.value)
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

    const filterEvaluatees = (entity, departmentName,jobType,path=null)=>{
        const evaluatees = ref(); 
            if(path === 'evaluations'){
                evaluatees.value = evaluateesToRate.value
            }else{
                evaluatees.value = allEvaluatees.value
            }
            
            if(entity !== "All"){
                evaluatees.value = evaluatees.value.filter(evaluatee => evaluatee.entity.entity_name === entity)
                if(departmentName !== "All"){
                    evaluatees.value = evaluatees.value.filter(evaluatee => evaluatee.departments[0].department === departmentName)
                }
           
            }

            if(jobType !== "All"){
                evaluatees.value = evaluatees.value.filter(evaluatee => evaluatee.job_type === Number(jobType))
            }

            return evaluatees.value
    }
    
    const fetchEvaluateesToRate = async(userId)=>{
        const { data } = await getEvaluateesToRate(userId)
        evaluateesToRate.value = data
      }
    
      const isRatedEvaluatees = (isDone) => {
        if(!isDone){
          return evaluateesToRate.value.filter(evaluatee => evaluatee.pivot.is_done === 0)
        }
  
        return evaluateesToRate.value.filter(evaluatee => evaluatee.pivot.is_done === 1)
      }

    const removeEvaluate = async(userId) => {
        const {data,status} = await deleteEvaluatee(userId);
        console.log({data,status})
    }

    const saveEvaluatee = async (val)=>{
        const value = {
            name: val.name,
            entity_id : val.entity_id,
            job_type : val.job_type,
        }
        const {data,status} = await storeEvaluatee(value)
        console.log(data,status)        
        if(status === 200){
            allEvaluatees.value = data.evaluatees
            return {
               message: data.message,
              newEvaluatees: allEvaluatees.value
            }
        }

    }

    return {
        saveEvaluatee,
        fetchAllEvaluatees,
        allEvaluatees,
        filterEvaluatees, 
        allEvaluated,
        fetchEvaluateesToRate,
        evaluateesToRate,
        isRatedEvaluatees,
        fetchEvaluateeInfo,
        errors,
        status,
        removeEvaluate
    }
})
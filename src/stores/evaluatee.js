import {  defineStore } from "pinia";
import { ref, watch } from "vue";
import { getAllEvaluatees,getEvaluateesToRate,getEvaluateeInfo,deleteEvaluatee} from "../http/evaluatee-api"


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

    const filterEvaluatees = (jobType, departmentName,path=null)=>{
        const evaluatees = ref(); 
            if(path === 'evaluations'){
                evaluatees.value = evaluateesToRate.value
            }else{
                evaluatees.value = allEvaluatees.value
            }

            if(departmentName == 'All'){
                if(jobType === 'Both'){
                    return evaluatees.value
                }
                return evaluatees.value.filter(evaluatee => evaluatee.job_type == Number(jobType))
            }else{

                if(jobType === 'Both'){
                    return evaluatees.value.filter((evaluatee)=>{
                        return evaluatee.departments.some(department => department.department === departmentName)
                    })
                }
                return evaluatees.value.filter((evaluatee)=>{
                    return evaluatee.departments.some(department => department.department === departmentName)
                }).filter(evaluatee => evaluatee.job_type == Number(jobType))
            }


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

      const filterJobType = (evaluateesId,val,routePath = null)=>{
        if(routePath == 'evaluations'){
            return evaluateesToRate.value.map(evaluatee =>{
                if(evaluateesId.includes(evaluatee.id) && evaluatee.job_type === val){
                    return evaluatee;
                }
            });
        }
      }

    return {
        filterJobType,
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
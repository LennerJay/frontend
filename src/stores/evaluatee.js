import {  defineStore } from "pinia";
import { ref, watch } from "vue";
import { getAllEvaluatees,getEvaluateesToRate,getEvaluateeInfo,deleteEvaluatee , storeEvaluatee} from "../http/evaluatee-api"
import { csrfCookie } from "../http/auth-api"

export const useEvaluateeStore = defineStore('evaluateeStore',() =>{
    const status = ref([]);
    const errors = ref([]);
    const savingErrors = ref([]);
    const allEvaluatees = ref([]);
    const allEvaluated = ref([]);
    const evaluateesToRate = ref([])
    const infoErrors = ref([])
    const evaluateeInfo = ref([])

    const fetchEvaluateeInfo = async(evaluateeId)=>{
        await csrfCookie()
        const id = {
            evaluatee_id: evaluateeId
        }
        try{
            const {data} = await getEvaluateeInfo(id)
            evaluateeInfo.value = data.data
            infoErrors.value = []
        }catch(e){
            evaluateeInfo.value =[]
            infoErrors.value = e.response
        }
    }

    const fetchAllEvaluatees = async (userId) =>{
        await csrfCookie()
        try{
            const { data } = await getAllEvaluatees(userId);
            allEvaluatees.value = data.data
            errors.value = []
        }catch(e){
            allEvaluatees.value = []
            errors.value = e.response
            console.log(errors.value)
        }
    }
    

    // if(localStorage.getItem('allEvaluatees')){
    //     allEvaluatees.value = JSON.parse(localStorage.getItem('allEvaluatees'))
    // }

    // watch(
    //     allEvaluatees,
    //     (evaluateesVal)=>{
    //         localStorage.setItem('allEvaluatees', JSON.stringify(evaluateesVal))
    //     },
    //     {
    //         deep:true
    //     }
    // );

    const filterEvaluatees = (entity, departmentName,jobType,path=null)=>{
        const evaluatees = ref([]); 
            if(path === 'evaluations'){
                evaluatees.value = evaluateesToRate.value
            }else{
                evaluatees.value = allEvaluatees.value
            }
            if(evaluatees.value.length == 0){
                return;
            }
            if(entity !== "All"){
                evaluatees.value = evaluatees.value.filter(evaluatee => evaluatee.entity_name === entity)
                if(departmentName !== "All"){
                    evaluatees.value = evaluatees.value.filter(evaluatee => evaluatee.departments.includes(departmentName))
                }
           
            }

            if(jobType !== "All"){
                evaluatees.value = evaluatees.value.filter(evaluatee => evaluatee.job_type === Number(jobType))
            }

            return evaluatees.value
    }
    
    const fetchEvaluateesToRate = async(userId)=>{
        await csrfCookie()
        const { data } = await getEvaluateesToRate(userId)
        evaluateesToRate.value = data.data
      }
    
      const isRatedEvaluatees = (isDone) => {
        if(!isDone){
          return evaluateesToRate.value.filter(evaluatee => evaluatee.is_done === 0)
        }
  
        return evaluateesToRate.value.filter(evaluatee => evaluatee.is_done === 1)
      }

    const removeEvaluate = async(userId) => {
        await csrfCookie()
        try{
            const {data,status} = await deleteEvaluatee(userId);
            console.log({data,status})
            if(status == 200){
                allEvaluatees.value = data.evaluatees
                return data.message
            }
            return data.message
    
        }catch(e){
            console.log(e)
        }
    }

    const saveEvaluatee = async (val)=>{
        await csrfCookie()
        const {data,status} = await storeEvaluatee(val)
        console.log(data,status)        
        if(status === 200){
            allEvaluatees.value = data.evaluatees
            return data.message
        }else{
            return 'Something went wrong'
        }

    }

    const groupByDepartment = (values, keySelector) => {
        return values.reduce(function (accumulator, current) {
            const key = keySelector(current);
            (accumulator[key] = accumulator[key] || []).push(current);
            return accumulator;
          }, {});
    }

    return {
        evaluateeInfo,
        infoErrors,
        savingErrors,
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
        removeEvaluate,
        groupByDepartment
    }
})
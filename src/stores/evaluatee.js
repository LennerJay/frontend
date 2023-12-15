import {  defineStore } from "pinia";
import { ref, watch } from "vue";
import { getAllEvaluatees,getEvaluateesToRate,getEvaluateeInfo, evaluateeUpdate, deleteEvaluatee , storeEvaluatee} from "../http/evaluatee-api"
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
    const isSuccess = ref(false)
    const errorMessage = ref([])
    const deleteMessage = ref([])

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
            const {data} = await deleteEvaluatee(userId);
            if(data.success){
                isSuccess.value = data.success
                deleteMessage.value= data.data
                allEvaluatees.value = allEvaluatees.value.filter(evaluatee => evaluatee.id != userId)
            }else{
                deleteMessage.value ='Something went wrong'
            }
            errors.value= []
        }catch(e){
            errors.value = e
        }
    }

    const saveEvaluatee = async (val)=>{
        await csrfCookie()
        const {data} = await storeEvaluatee(val) 
        if(data.success){
            isSuccess.value = data.success
            allEvaluatees.value.unshift(data.data)
            errorMessage.value = []
        }else{
            isSuccess.value = data.success
            errorMessage.value = data.message
        }

    }

    const updateEvaluatee = async (evaluatee_id,val)=>{
        await csrfCookie()
        try {
            const {data} = await evaluateeUpdate(evaluatee_id,val);
            console.log(data)
            if(data.success){
                isSuccess.value = data.success
                allEvaluatees.value = allEvaluatees.value.filter(evaluatee => evaluatee.id != evaluatee_id)
                allEvaluatees.value.unshift(data.data)
                errorMessage.value = []
            }else{
                isSuccess.value = data.success
                errorMessage.value = data.message
            }
            errors.value =[]
        } catch (e) {
            errors.value = e
        }
    }

    // const groupByDepartment = (values, keySelector) => {
    //     return values.reduce(function (accumulator, current) {
    //         const key = keySelector(current);
    //         (accumulator[key] = accumulator[key] || []).push(current);
    //         return accumulator;
    //       }, {});
    // }
    const groupByDepartment = () => {
        const keySelector1 = (value) => value.department
        const keySelector2 = (value) => value.subject
        const evaluateeClasses = [];
        const klasses =  evaluateeInfo.value.classes.reduce(function (accumulator, current) {
            const key = keySelector1(current);
            (accumulator[key] = accumulator[key] || []).push(current);
            return accumulator;
          }, {});
          for (const klass in klasses) {
            const newValue = klasses[klass].reduce(function (accumulator, current) {
                const key = keySelector2(current);
                (accumulator[key] = accumulator[key] || []).push(current);
                return accumulator;
              }, {});
            evaluateeClasses.push({
              department: klass,
              classes: newValue,
            });
          }

          return evaluateeClasses;
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
        groupByDepartment,
        isSuccess,
        errorMessage,
        deleteMessage,
        updateEvaluatee
    }
})
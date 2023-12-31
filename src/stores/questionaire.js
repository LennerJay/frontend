import { defineStore } from "pinia";
import {attachCriteria,removeCriteria,AddQuestionaire, deleteQuestionaire,updateStatusQuestionaire,allQuestionaires,getLatestQuestionaire,getQuestionaireForEvaluatee,getMaxRespondents ,updateQuestionaire, getCriteriasWithQuestions} from "../http/questionaire-api";
import { csrfCookie } from "../http/auth-api"

import { ref, watch } from "vue";

export const useQuestionaireStore = defineStore('questionaireStore',()=>{
    const questionaires = ref([]);
    const latestQuestionaire = ref([]);
    const errors = ref([]);
    const questionaireForEvaluatee = ref([]);
    const maxRespondents= ref([]);
    const isSuccess = ref(false);
    const isUpdateSuccess = ref(false);
    const criteriasWithQuestions = ref([]);

    const fetchQuestionaire = async ()=>{
        try{
            const {data}  = await allQuestionaires();
            if(data.success){
                isSuccess.value = true
                questionaires.value =  data.data
            }else{
                isSuccess.value = false
            }
            errors.value = []
        }catch(e){
            questionaires.value = null;
            errors.value = e.response
        }
      
    }

    const fetchLatestQuestionaire = async ()=>{
        try{
            const {data}  = await getLatestQuestionaire();
            latestQuestionaire.value =  data
        }catch(e){
            latestQuestionaire.value = null;
            errors.value = e.response
        }
      
    }

    // if(localStorage.getItem('questionaires')){
    //     questionaires.value = JSON.parse(localStorage.getItem('questionaires'))
    // }
    if(localStorage.getItem('latest-questionaires')){
        latestQuestionaire.value = JSON.parse(localStorage.getItem('latest-questionaires'))
    }
    if(localStorage.getItem('questionaire-for-evaluatee')){
        questionaireForEvaluatee.value = JSON.parse(localStorage.getItem('questionaire-for-evaluatee'))
    }


    // watch(
    //     questionaires,
    //     (questionairesVal)=>{
    //         localStorage.setItem('questionaires',JSON.stringify(questionairesVal))
    //     },
    //     {
    //         deep:true
    //     }

    // );
    watch(
        latestQuestionaire,
        (latestQuestionaireVal)=>{
            localStorage.setItem('latest-questionaires',JSON.stringify(latestQuestionaireVal))
        },
        {
            deep:true
        }

    );
    watch(
        questionaireForEvaluatee,
        (questionaireForEvaluateeVal)=>{
            localStorage.setItem('questionaire-for-evaluatee',JSON.stringify(questionaireForEvaluateeVal))
        },
        {
            deep:true
        }

    );
    watch(
        maxRespondents,
        (maxRespondentsVal)=>{
            localStorage.setItem('max-repondents',JSON.stringify(maxRespondentsVal))
        },
        {
            deep:true
        }
    )
    const fetchQuestionaireForEvaluatee = async(entityId)=>{
        const id = {
            entity_id : entityId
        }
        try{
            const {data} = await getQuestionaireForEvaluatee(id);
            questionaireForEvaluatee.value = data.data.questionaires[0];
            errors.value = [];
        }catch(e){
            questionaireForEvaluatee.value = [];
            errors.value = e;
        }
    }

    const fetchMaxRespondents = async()=>{
      try{
        const {data} = await getMaxRespondents();
        maxRespondents.value = data.data
        errors.value = []
      }catch(e){
        errors.value = e
        maxRespondents.value= []
      }
    }

    const filterQuestionaires = (val)=>{
        let questionaires = groupbByEntity()
        if(val == 'All'){
            return questionaires
        }
        return questionaires.filter(q => q.entity_name == val)
    }

    const questionaireUpdate = async(qId,datas)=>{
        await csrfCookie()
        try{
            const {data} = await updateQuestionaire(qId,datas);
            console.log(data)
            if(data.success){
                isSuccess.value = true
                 questionaires.value = questionaires.value.filter(q => q.id != qId)
                questionaires.value.unshift(data.data)
            }
            errors.value = []
        }catch(e){
            errors.value = e
        }
    }

    const updateStatus = async(qId)=>{
        await csrfCookie()
        try{
          const {data} =  await updateStatusQuestionaire(qId)
          if(data.success){
                if(data.data){
                    isSuccess.value = true
                    isUpdateSuccess.value = true
                    questionaires.value = questionaires.value.filter(q => q.id != qId)
                    questionaires.value.unshift(data.data)
                }else{
                    isUpdateSuccess.value = false
                }
            }else{
                isSuccess.value = false
            }
            errors.value =[]
        }catch(e){
            errors.value = e
        }
    }
    const removeQuestionaire = async(qId)=>{
        await csrfCookie()
        try{
          const {data} =   await deleteQuestionaire(qId)
          if(data.success){
            questionaires.value = questionaires.value.filter(q => q.id != qId)
            isSuccess.value = true
        }
          errors.value = []
        }catch(e){
            errors.value = e
        }
    }

    const saveQuestionaire = async(datas) => {
        await csrfCookie()
        try {
            const {data} = await AddQuestionaire(datas)
            if(data.success){
                questionaires.value.unshift(data.data)
                isSuccess.value = true
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }

    const groupbByEntity = ()=>{
        const q = []
        const keySelector = (value) => value.entity_name
        const datas = questionaires.value.reduce(function (accumulator, current) {
          const key = keySelector(current);
          (accumulator[key] = accumulator[key] || []).push(current);
          return accumulator;
        }, {});
        for(const val in datas){
            q.push({
                entity_name: val,
              datas: datas[val]
            })
        }
        return q
    }

    const fetchQuestionaireWithCriterias = async(id)=>{
        try {
            const {data} = await getCriteriasWithQuestions(id)
            if(data.success){
                isSuccess.value = true
                criteriasWithQuestions.value = data.data.criterias
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }

    const detachCriteria = async(qId,id)=>{
        await csrfCookie()
        try {
            const {data} = await removeCriteria(qId,{criteria_id:id})
            console.log(data)
            if(data.success){
                isSuccess.value = true
                criteriasWithQuestions.value = criteriasWithQuestions.value.filter(criteria => criteria.id !=id)
            }else{
                isSuccess.value = true
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }

    const attachCriterias = async (qId,values)=>{
        await csrfCookie()
        try {
            const {data} = await attachCriteria(qId,{criteria_ids:values})
            console.log(data)
            if(data.success){
                isSuccess.value = true
                criteriasWithQuestions.value.unshift()
            }else{
                isSuccess.value = true
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }

    return {
        attachCriterias,
        detachCriteria,
        criteriasWithQuestions,
        fetchQuestionaireWithCriterias,
        groupbByEntity,
        questionaires,
        fetchQuestionaire,
        latestQuestionaire,
        fetchLatestQuestionaire,
        questionaireForEvaluatee,
        fetchQuestionaireForEvaluatee,
        fetchMaxRespondents,
        maxRespondents,
        filterQuestionaires,
        isSuccess,
        errors,
        questionaireUpdate,
        updateStatus,
        removeQuestionaire,
        saveQuestionaire,
        isUpdateSuccess
    }
})
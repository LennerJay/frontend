import { defineStore } from "pinia";
import { allQuestionaires,getLatestQuestionaire,getQuestionaireForEvaluatee,getMaxRespondents } from "../http/questionaire-api";
import { ref, watch } from "vue";

export const useQuestionaireStore = defineStore('questionaireStore',()=>{
    const questionaires = ref([]);
    const latestQuestionaire = ref([]);
    const errors = ref([]);
    const questionaireForEvaluatee = ref([]);
    const maxRespondents= ref([]);

    const fetchQuestionaire = async ()=>{
        try{
            const {data}  = await allQuestionaires();
            questionaires.value =  data.data
        }catch(e){
            questionaires.value = null;
            errors.value = e.response
            console.log(errors.value)
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

    if(localStorage.getItem('questionaires')){
        questionaires.value = JSON.parse(localStorage.getItem('questionaires'))
    }
    if(localStorage.getItem('latest-questionaires')){
        latestQuestionaire.value = JSON.parse(localStorage.getItem('latest-questionaires'))
    }
    if(localStorage.getItem('questionaire-for-evaluatee')){
        questionaireForEvaluatee.value = JSON.parse(localStorage.getItem('questionaire-for-evaluatee'))
    }


    watch(
        questionaires,
        (questionairesVal)=>{
            localStorage.setItem('questionaires',JSON.stringify(questionairesVal))
        },
        {
            deep:true
        }

    );
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
    // watch(
    //     maxRespondents,
    //     (maxRespondentsVal)=>{
    //         localStorage.setItem('max-repondents',JSON.stringify(maxRespondentsVal))
    //     },
    //     {
    //         deep:true
    //     }
    // )
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


    return {
        questionaires,
        fetchQuestionaire,
        latestQuestionaire,
        fetchLatestQuestionaire,
        questionaireForEvaluatee,
        fetchQuestionaireForEvaluatee,
        fetchMaxRespondents,
        maxRespondents
    }
})
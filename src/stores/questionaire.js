import { defineStore } from "pinia";
import { allQuestionaires } from "../http/questionaire-api";
import { ref, watch } from "vue";

export const useQuestionaireStore = defineStore('questionaireStore',()=>{
    const questionaires = ref([]);

    const fetchQuestionaire = async ()=>{
        questionaires.value = await allQuestionaires();
      
    }

    if(localStorage.getItem('questionaires')){
        questionaires.value = JSON.parse(localStorage.getItem('questionaires'))
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




    return {
        questionaires,fetchQuestionaire
    }
})
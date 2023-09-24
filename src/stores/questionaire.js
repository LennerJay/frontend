import { defineStore } from "pinia";
import { allQuestionaires } from "../http/questionaire-api";
import { ref } from "vue";

export const useQuestionaireStore = defineStore('questionaireStore',()=>{
    const questionaires = ref([]);

    const fetchQuestionaire = async ()=>{
        questionaires.value = await allQuestionaires();
      
    }






    return {
        questionaires,fetchQuestionaire
    }
})
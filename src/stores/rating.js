import { defineStore } from "pinia";
import { saveRatings ,fetchRatingsSummary} from "../http/rating-api";
import { ref } from "vue";


export const useRatingStore = defineStore('ratingStore',()=>{

    const response = ref([]);
    const error = ref([]);
    const summary = ref([]);
    const summaryError = ref([]);


    const save = async(value)=>{
        try{
            response.value = await saveRatings(value)
            error.value = []
        } catch(e){
            response.value =[]
            error.value = e.response
        }
    }

    const getRatingSummary = async(evaluateeId)=>{
        const {data} = await fetchRatingsSummary({evaluatee_id:evaluateeId});
        if(data.success){
            summary.value = data.data
            summaryError.value = [];
        }else{
            summaryError.value = data.message
            summary.value = []
        }
  
    }

    return {
        save,
         response, 
         error,
         getRatingSummary,
         summary,
         summaryError
    }
})
import { defineStore } from "pinia";
import { saveRatings ,fetchRatingsSummary,getOutComeRatings, fetchRatingInfo} from "../http/rating-api";
import { ref } from "vue";


export const useRatingStore = defineStore('ratingStore',()=>{

    const response = ref([]);
    const errors = ref([]);
    const summary = ref([]);
    const summaryError = ref([]);
    const ratingResult = ref([]);
    const isSuccess = ref(false)

    const save = async(value)=>{
        try{
            response.value = await saveRatings(value)
            errors.value = []
        } catch(e){
            response.value =[]
            errors.value = e.response
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


    const fetchOutcomeRatings = async(id, e_id)=>{
    
        try {
            const {data} = await getOutComeRatings({evaluatee_id:id,entity_id:e_id})
            if(data.success){
                isSuccess.value = true
                ratingResult.value = data.data
            }else{
                isSuccess.value = false
                ratingResult.value = []
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }


    const getRatingInfo= async(evaluateeId,qId,rating)=>{
        try {
            const {data} = await fetchRatingInfo({evaluatee_id:evaluateeId,question_id:qId,  rating:rating})
            if(data.success){
                isSuccess.value = true
                ratingResult.value = data.data
            }else{
                isSuccess.value = false
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }

    return {
        save,
         response, 
         errors,
         getRatingSummary,
         summary,
         summaryError,
         fetchOutcomeRatings,
         ratingResult,
         getRatingInfo
    }
})
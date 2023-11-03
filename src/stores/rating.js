import { defineStore } from "pinia";
import { saveRatings } from "../http/rating-api";
import { ref } from "vue";


export const useRatingStore = defineStore('ratingStore',()=>{

    const response = ref('');
    const error = ref('');

    const save = async(value)=>{
        try{
            response.value = await saveRatings(value)
        } catch(e){
            error.value = e.response
        }
    }




    return {
        save, response, error
    }
})
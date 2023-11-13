import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getEvaluateeInfo} from "../http/evaluatee-api"

export const userModalStore = defineStore('modalStore', () => {
    const modalState = ref(false);
    const selectedEvaluatee = ref(null);
    const evaluateeInfo = ref([]);

      const openModal = async(evaluatee) => {
        modalState.value = !modalState.value;
      selectedEvaluatee.value = evaluatee;

      // console.log(selectedEvaluatee);
    }
  
    const fetchEvaluateeInfo = async(evaluateeId)=>{

      const id = {
          evaluatee_id: evaluateeId
      }
      const {data} = await getEvaluateeInfo(id)
      console.log(data)
  }

    return {
            fetchEvaluateeInfo,
             modalState, 
             openModal,
              selectedEvaluatee 
            };
});
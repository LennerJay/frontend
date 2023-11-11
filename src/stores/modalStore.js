import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userModalStore = defineStore('modalStore', () => {
    const modalState = ref(false);
    const selectedEvaluatee = ref(null);
  
    function openModal(evaluatee) {
      selectedEvaluatee.value = evaluatee;
      modalState.value = !modalState.value;
      console.log(selectedEvaluatee);
    }
  
    return { modalState, openModal, selectedEvaluatee };
});
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getEvaluateeInfo} from "../http/evaluatee-api"

export const userModalStore = defineStore('modalStore', () => {
    const modalState = ref(false);
    const selectedEvaluatee = ref(null);
    const evaluateeInfo = ref([]);
    const modalAdd = ref(false);
    const modalEdit = ref(false);
    const modalDelete = ref(false);

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

    const showCreateModal = () => {
      modalAdd.value = !modalAdd.value;
      console.log('Show Clicked');
    }

    const showEditModal = () => {
      modalEdit.value = !modalEdit.value;
      console.log('Edit Clicked');
    }

    const showDeleteModal = () => {
      modalDelete.value = !modalDelete.value;
      console.log('delete Clicked');
    }

    return {
            fetchEvaluateeInfo,
            modalState, 
            openModal,
            selectedEvaluatee,
            modalAdd, 
            modalEdit, 
            modalDelete, 
            showCreateModal, 
            showEditModal, 
            showDeleteModal 
            };
});
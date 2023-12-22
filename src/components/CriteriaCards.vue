<template>
  <div class="w-full h-full">
    <div class="mb-5 ml-2 mt-auto"> 
      <button @click="showModal('Add')" id="add-btn" class="rounded">Add Criterias</button>
    </div>
    <div v-if="showLoadingAnimation" class="pl-10 pr-[120px] max-h-full ml-20 mb-80">
      <LoadingAnimation />
    </div>
    
    <div v-if="showData && !showLoadingAnimation" class="grid md:grid-cols-4 grid-cols-2 w-full h-full">  
      <div class="flex flex-col w-full " v-for="criteria in criterias">
        <div 
          class="m-2 max:w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-poppins capitalize"
          >
            {{ criteria.description }}
          </h5>

          <p
            @click="clickQuestions(criteria.id)"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center cursor-pointer text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Questions
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </p>
          <p :class="{ 'text-green-600': criteria.status, 'text-gray-600': !criteria.status }" class="mt-2 text-[15px] text-right">
            {{ criteria.status ? 'Currently Used':'Unused' }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="!showData && !showLoadingAnimation " >
      <span class="font-bold text-2xl">
            No data found
        </span>

    </div>
    <transition name="fade">
      <AddCriteria v-if="showAddCriteria" :option="option" :criteria="selectedcriteria" @close="closeAddCriteriaModal"/>
    </transition>
    <transition name="fade">
      <QuestionsTableModal v-if="showQuestionsTableModal" 
        :criteria="selectedcriteria"

        :showActionSpinner="showActionSpinner"
        :showActionModal="showActionModal"
        @removeCriteria="removeCriteria"
        @editCriteria="editCriteria"
       @close ="closeAddCriteriaModal" />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCriteriaStore } from "../stores/criteria";
import LoadingAnimation from "./LoadingAnimation.vue";
import AddCriteria from "./AddCriteria.vue";
import QuestionsTableModal from "./QuestionsTableModal.vue";

const criteriaStore = useCriteriaStore();
const showData = ref(false)
const showActionSpinner= ref(false)
const showActionModal=ref(false)
const showAddCriteria = ref(false)
const showLoadingAnimation = ref(false);
const criterias = ref([]);
const criteriaId = ref(0)
const showQuestionsTableModal = ref(false)
const selectedcriteria = ref([])
const option=ref('')

const showModal =(val)=>{
  option.value=val
  showAddCriteria.value = true

}
const editCriteria= ()=>{
  showQuestionsTableModal.value = false
  showModal('Edit')
}


const removeCriteria = async(id)=>{
  showActionSpinner.value = true
  await criteriaStore.removeCriteria(id)
  showActionSpinner.value = false
  if(criteriaStore.isSuccess){
    showActionModal.value = true
    setTimeout(()=>{
      showActionModal.value = false
      closeAddCriteriaModal()
    },1500)
  }else{
    alert('Something went wrong')
  }

}

const closeAddCriteriaModal = ()=>{
  criterias.value = criteriaStore.criterias;
  selectedcriteria.value = ''
  showAddCriteria.value = false;
  showQuestionsTableModal.value = false

}

const clickQuestions = async(qId)=>{
  selectedcriteria.value = criterias.value.find(c => c.id == qId)
  criteriaId.value = qId;
  showQuestionsTableModal.value = true

 
}

onMounted(async () => {
  showLoadingAnimation.value = true;
  if (criteriaStore.criterias.length == 0) {
    await criteriaStore.fetchAllCriteria();
  }
  showLoadingAnimation.value = false;
  criterias.value = criteriaStore.criterias;
  if(criteriaStore.criterias.length != 0){
    showData.value = true
  }else{
    showData.value = false
  }

});
</script>

<style scoped>

#add-btn {
  outline: none;
  padding: 6px 12px;
  background-color: #0c4a6e;
  color: #ffffff;
}
#add-btn:hover {
  background-color: #1885f2;
  color: #ffffff;
  cursor: pointer;
}
</style>

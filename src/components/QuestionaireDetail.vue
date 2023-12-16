<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-20"
  >
    <div
      class="relative bg-white pl-5 pr-5 md:max-w-2xl max-w-sm mx-auto md:mt-36 mt-12 border-4 border-sky-950 rounded-xl max-h-[36rem] overflow-y-auto"
    >

      <div class="container w-full mt-6">
        <div class="flex justify-between items-center">
          <div>
           Questionaire Details
          </div>
         <div>
          <button @click="emits('backButton')" id="close-btn">
            <i class="bi bi-x-lg"></i>
            <span></span>
          </button>
         </div>

        </div>
        <div class="flex items-center mb-5  gap-5">
          <label 
              class="text-left block text-gray-500 font-bold  mb-1 md:mb-0 pr-4 flex-grow min-w-[120px]"
              for="title"
            >
            Title 
            </label>
          <input
              id="title"
              v-model="title"
              :disabled="isEnable"
              class=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            />
            <div class="flex items-center">
              <span class="text-white invisible"
                >.</span
              >
              <Transition name="fade" appear>
                <span v-if="errors.title">{{ errors.title }}</span>
              </Transition>
            </div>
        </div>
        <div class="flex items-start mb-5  gap-5 ">
          <label 
              class=" pt-2 text-gray-500 font-bold text-left  mb-1 md:mb-0 pr-4  flex-grow min-w-[120px]"
              for="questionaire-description"
            >
            Description 
            </label>
          <textarea
              v-model="description"
              rows="3"
              id="questionaire-description"
              :disabled="isEnable"
              class=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
             
            />
        </div>
        <div class="flex items-center mb-5  gap-5">
          <label 
              class="block text-gray-500 font-bold text-left  mb-1 md:mb-0 pr-4  flex-grow min-w-[120px]"
              for="semester"
            >
            Semester 
            </label>
          <input
          v-model="semester"
              id="semester"
              :disabled="isEnable"
              class=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
             
            />
        </div>
        <div class="flex items-center mb-5  gap-5">
          <label 
              class="block text-gray-500 font-bold text-left  mb-1 md:mb-0 pr-4  flex-grow min-w-[120px]"
              for="school-year"
            >
            School Year 
            </label>
          <input
              v-model="schoolYear"
              id="school-year"
              :disabled="isEnable"
              class=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
              
            />
        </div>
        <div class="flex items-center mb-5  gap-5">
          <label 
              class="block text-gray-500 font-bold text-left  mb-1 md:mb-0 pr-4  flex-grow min-w-[120px]"
              for="max-respondents"
            >
            Max Respondents 
            </label>
          <input
          v-model="maxRespondents"
              id="max-respondents"
              :disabled="isEnable"
              class=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            
            />
        </div>
        <div class="flex items-center mb-5  gap-5">
          <label 
              class="block text-gray-500 font-bold text-left  mb-1 md:mb-0 pr-4  flex-grow min-w-[120px]"
              for="questionaire-status"
            >
            Status
            </label>
          <input
              id="questionaire-status"
              disabled
              class=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
              :value="selectedQuestionaire.status == 0 ? 'Unused' :'Used '"
            />
        </div>
  
      </div>

      <div class="flex justify-end mt-5 mb-5 gap-6">
        <button
          class="border border-black p-1"
          id="back-button"
          @click="updateStatus"
        >
          {{  status ? 'Unuse': "Use"}}
        </button>
        <button
          class="border border-black p-1"
          id="back-button"
          @click="isEnable = !isEnable"
        >
          {{isEnable ?"Edit":"Cancel"}}
        </button>
        <button v-if="isEnable"
          class="border border-black p-1"
          id="back-button"
          @click="emits('backButton')"
        >
          Back
        </button>
        <button v-else
          class="border border-black p-1"
          id="back-button"
          @click="updateQuestinaire"
        >
          Save
        </button>
      </div>
      <TransitionGroup name="fade">
        <ActionSpinnerAnimation v-if="showActionSpinner" data="Updating"/>
        <ActionModal v-if="showActionModal" data="Updated" @closeAction="showActionModal=false"/>
      </TransitionGroup>

    </div>
  </div>

  <!-- End of container -->
</template>

<script setup>
import { ref } from 'vue';
import { useQuestionaireStore } from '../stores/questionaire';
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";
import WarningModal from "./WarningModal.vue";

const questionaireStore = useQuestionaireStore()

const showActionSpinner = ref(false)
const showActionModal = ref(false)
const title = ref(props.selectedQuestionaire.title);
const description = ref(props.selectedQuestionaire.description);
const semester = ref(props.selectedQuestionaire.semester);
const schoolYear = ref(props.selectedQuestionaire.school_year);
const maxRespondents = ref(props.selectedQuestionaire.max_respondents)
const status = ref(props.selectedQuestionaire.status)
const errors = ref({})

const emits = defineEmits(["backButton"]);
const props = defineProps({
  selectedQuestionaire: Object,
});

// const showActionSpinner = ref(false);
// const showActionModal = ref(false);
// const showWarningModal = ref(false);
// const actionSpinnerData = ref("");
// const actionData = ref("");

const isEnable = ref(true);

const updateQuestinaire = async()=>{
  const qId = props.selectedQuestionaire.id
  const data = {
    title: title.value,
    description: description.value,
    semester: semester.value,
    school_year: schoolYear.value,
    max_respondents: maxRespondents.value,
    status: props.selectedQuestionaire.status
  }
  showActionSpinner.value = true
  await questionaireStore.questionaireUpdate(qId,data)
  showActionSpinner.value = false
  if(questionaireStore.isSuccess){
    showActionModal.value = true
    setTimeout(()=>{
      showActionModal.value = false
    },1000);
    isEnable.value = true
  }
}

const updateStatus = async()=>{
  showActionSpinner.value = true
  await questionaireStore.updateStatus(props.selectedQuestionaire.id)
  showActionSpinner.value = false
  if(questionaireStore.isSuccess){
    showActionModal.value = true
    setTimeout(()=>{
      showActionModal.value = false
    },1000);
    isEnable.value = true
  }
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
button#back-button {
  border: none;
  outline: none;
  background-color: #0c4a6e;
  color: #ffffff;
  border-radius: 3px;
  padding: 8px 20px;
}

button#back-button:hover {
  background-color: #000000;
  color: #ffffff;
  cursor: pointer;
}

#close-btn {
  border: none;
  display: block;
  position: relative;
  padding: 4px 8px;
  font-size: 12px;
  background: transparent;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  color: black;
  z-index: 1;
  font-family: inherit;
  font-weight: 1500;
  margin-bottom: 10px;
}

#close-btn span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: -1;
  border: 2px solid rgb(109, 109, 109);
}

#close-btn span::before {
  content: "";
  display: block;
  position: absolute;
  width: 8%;
  height: 500%;
  background: var(--lightgray);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-60deg);
  transition: all 0.3s;
}

#close-btn:hover span::before {
  transform: translate(-50%, -50%) rotate(-90deg);
  width: 100%;
  background-color: rgba(7, 89, 133, 1);
}

#close-btn:hover {
  color: white;
}

#close-btn:active span::before {
  background: #2751cd;
}

</style>

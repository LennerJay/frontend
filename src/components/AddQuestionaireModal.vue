<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-50"
  >
    <div
      class="relative bg-white pl-5 pr-5 md:max-w-2xl max-w-sm mx-auto md:mt-24 mt-10 border-4 border-sky-950 rounded-xl max-h-[36rem] overflow-y-auto"
    >
      <div class="container w-full mt-6">
        <div class="flex justify-between items-center">
          <div>Add Questionaire</div>
          <div>
            <button @click="closeModal" id="close-btn">
              <i class="bi bi-x-lg"></i>
              <span></span>
            </button>
          </div>
        </div>


        <div class="flex flex-col">
          <div class="flex items-center mb-2 mt-2 gap-5">
            <label
              class="text-left block text-gray-500 font-bold mb-1 md:mb-0 pr-4 flex-grow min-w-[120px]"
              for="adding-entity"
            >
              For
            </label>
            <select
              
              @change="entityInput"
              v-model="entity"
              name="adding-entity"
              id="adding-entity"
              class="w-full h-full bg-transparent text-blue-gray-700 font-poppins capitalize font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            >
              <option value="" disabled>Select</option>
              <option
                v-for="(entity, entityIndex) in entities"
                :key="entityIndex"
                :value="entity.id"
              >
                {{ entity.entity_name }}
              </option>
            </select>
          </div>
          <div class="flex items-center gap-5">
            <span class="flex-grow min-w-[120px] invisible">.</span>
            <transition name="fade">
              <span class="w-full pl-3 text-rose-600" v-if="errors.entity">{{ errors.entity }}</span>
            </transition>
          </div>
        </div>


        <div class="flex flex-col ">
         <div class="flex items-center mb-2 mt-2 gap-5">
          <label
            class="text-left block text-gray-500 font-bold mb-1 md:mb-0 pr-4 flex-grow min-w-[120px]"
            for="title"
          >
            Title
          </label>
          <input
            @input="titleInput"
            v-model="title"
            id="title"
            class="w-full h-full bg-transparent text-blue-gray-700 font-poppins capitalize font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
          />
         
         </div>
         <div class="flex items-center gap-5">
            <!-- <span class="text-white invisible" >.</span> -->
            <span class="flex-grow min-w-[120px] invisible">.</span>
            <transition name="fade">
              <span class="w-full pl-3 text-rose-600" v-if="errors.title">{{ errors.title }}</span>
            </transition>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex items-start mb-2 mt-2 gap-5">
              <label
              class=" pt-2 text-gray-500 font-bold text-left  mb-1 md:mb-0 pr-4  flex-grow min-w-[120px]"
            for="description"
          >
            Description
          </label>
          <textarea
          rows="3"
            @input="descriptionInput"
            v-model="description"
            id="description"
            class=" w-full h-full bg-transparent text-blue-gray-700 font-poppins capitalize font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
          />
            
            </div>
            <div class="flex items-center gap-5">
              <span class="flex-grow min-w-[120px] invisible">.</span>
              <transition name="fade">
                <span class="w-full pl-3 text-rose-600"  v-if="errors.description">{{ errors.description }}</span>
              </transition>
            </div>
        </div>


        <div class="flex flex-col">
          <div class="flex items-center mb-2 mt-2 gap-5">
            <label
              class="block text-gray-500 font-bold text-left mb-1 md:mb-0 pr-4 flex-grow min-w-[120px]"
              for="semester"
            >
              Semester
            </label>
            <input
              @input="semesterInput"
              v-model="semester"
              id="semester"
              class="w-full h-full bg-transparent text-blue-gray-700 font-poppins capitalize font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            />
          </div>
          <div class="flex items-center gap-5">
              <span class="flex-grow min-w-[120px] invisible">.</span>
              <transition name="fade">
                <span class="w-full pl-3 text-rose-600" v-if="errors.semester">{{ errors.semester }}</span>
              </transition>
          </div>
        </div>


        <div class="flex flex-col">
          <div class="flex items-center mb-2 mt-2 gap-5">
            <label
            class="block text-gray-500 font-bold text-left mb-1 md:mb-0 pr-4 flex-grow min-w-[120px]"
            for="school-year"
          >
            School Year
          </label>
          <input
            @input="schoolYearInput"
            v-model="schoolYear"
            id="school-year"
            class="w-full h-full bg-transparent text-blue-gray-700 font-poppins capitalize font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
          />
          </div>
          <div class="flex items-center gap-5">
              <span class="flex-grow min-w-[120px] invisible">.</span>
              <transition name="fade">
                <span class="w-full pl-3 text-rose-600" v-if="errors.schoolYear">{{ errors.schoolYear }}</span>
              </transition>
          </div>
        </div>


        <div class="flex flex-col">
          <div class="flex items-center mb-2 mt-2 gap-5">
            <label
            class="block text-gray-500 font-bold text-left mb-1 md:mb-0 pr-4 flex-grow min-w-[120px]"
            for="max-respondents"
          >
            Max Respondents
          </label>
          <input
            @input="maxRespondentsInput"
            v-model="maxRespondents"
            id="max-respondents"
            type="number"
            class="w-full h-full bg-transparent text-blue-gray-700 font-poppins capitalize font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
          />
          </div>
          <div class="flex items-center gap-5">
              <span class="flex-grow min-w-[120px] invisible">.</span>
              <transition name="fade">
                <span class="w-full pl-3 text-rose-600" v-if="errors.maxRespondents">{{ errors.maxRespondents }}</span>
              </transition>
          </div>
        </div>


      </div>


      <div class="flex justify-end mt-5 mb-5 gap-6">
        <button class="border border-black p-1" id="back-button" @click="closeModal">
          Back
        </button>
        <button class="border border-black p-1" id="back-button" @click="saveQuestionaire">
          Save
        </button>
      </div>

      <transition-group name="fade">
        <ActionSpinnerAnimation key=1 v-if="showActionSpinner" data="Saving"/>
        <ActionModal v-if="showActionModal"  data="Save" @closeAction="showActionModal = false"/>
      </transition-group>
     
    </div>
  </div>

  <!-- End of container -->
</template>

<script setup>
import { ref } from "vue";
import { useQuestionaireStore } from "../stores/questionaire";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";

const questionaireStore = useQuestionaireStore()

const showActionSpinner = ref(false);
const showActionModal = ref(false);

const entity = ref("");
const title = ref("");
const description = ref("");
const semester = ref("");
const schoolYear = ref("");
const maxRespondents = ref("");
const errors = ref({});
const emits = defineEmits(["close"]);


const saveQuestionaire = async()=>{
  const datas = {};
  if(validateInputs()){
    return;
  }
  datas.entity_id = entity.value
  datas.title =  title.value
  datas.description = description.value
  datas.semester = semester.value
  datas.school_year = schoolYear.value
  datas.max_respondents = maxRespondents.value
  datas.status = 0
  showActionSpinner.value = true
  await questionaireStore.saveQuestionaire(datas)
  showActionSpinner.value = false
  if(questionaireStore.isSuccess){
    showActionModal.value = true
    setTimeout(()=>{
      showActionModal.value = false
      clearInputs();
      closeModal();
    },1000)


  }
}

const clearInputs = ()=>{
   entity.value = ''
   title.value = ''
   description.value = ''
  semester.value = ''
   schoolYear.value = ''
  maxRespondents.value = ''
}

const validateInputs = ()=>{
  let isError = false;
  if(entity.value == ""){
    errors.value.entity = "Please Choose"
    isError = true;
  }
  if(title.value == ""){
    errors.value.title = "Input title"
    isError = true;
  }
  if(description.value == ""){
    errors.value.description = "Input Description"
    isError = true;
  }
  if(semester.value == ""){
    errors.value.semester = "Input Semester"
    isError = true;
  }
  if(schoolYear.value == ""){
    errors.value.schoolYear = "Input School Year"
    isError = true;
  }
  if(maxRespondents.value == ""){
    errors.value.maxRespondents = "Input max respondents"
    isError = true;
  }

  return isError
}


const entityInput = ()=>{
  errors.value.entity = ""
}
const titleInput = ()=>{
  errors.value.title = ""
}
const descriptionInput = ()=>{
  errors.value.description = ""
}
const semesterInput = ()=>{
  errors.value.semester = ""
}
const schoolYearInput = ()=>{
  errors.value.schoolYear = ""
}

const maxRespondentsInput = ()=>{
  errors.value.maxRespondents = ""
}

const closeModal = () => {
  emits("close");
};

const props = defineProps({
  selectedQuestionaire: Object,
  entities: Object,
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
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

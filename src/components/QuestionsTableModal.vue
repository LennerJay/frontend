<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins"
    style="z-index: 10000"
  >
    <div
      class="relative bg-white md:max-w-3xl max-w-sm mx-auto mt-48 border-4 border-sky-950 rounded-xl max-h-[40rem] min-h-[20rem] overflow-y-auto"
    >
      <div class="flex justify-between items-center mt-4">
        <div class="invisible">.</div>
        <div class="mr-3">
          <button @click="emits('close')" id="close-btn">
            <i class="bi bi-x-lg"></i>
            <span></span>
          </button>
        </div>
      </div>
      <div v-if="showData" class="h-full">
        <div class="mx-5">
          <table>
            <thead>
              <th></th>
              <th>Action</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  {{ propsCriteria.description }}
                </td>
                <td>
                  <button @click="editCriteria">Edit</button>
                  <button @click="showWarningClick('Criteria')">Delete</button>
                </td>
              </tr>
              <tr v-if="questions.length == 0">
                <td class="pl-5">No Questions</td>
              </tr>
              <tr v-else v-for="question in questions" :key="question.id">
  
                <td class="pl-5">
                  {{ question.id }}
                </td>
                <td class="pl-5">
                  {{ question.question }}
                </td>
                <td class="flex">
                  <button @click="editQuestion(question)">Edit</button>
                  <button @click="showWarningClick('Question', question.id)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-end mr-5 mb-5 gap-5">
        <button
          @click="emits('close')"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
        <button
          @click="addQuestionClick"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Question
        </button>
      </div>
      </div>
      <div
        v-else
        class="bg-white p-[10px] pl-5 pr-32 max-w-lg mx-auto mt-40 max-h-[26rem] flex"
      >
        <div class="loader">
          <svg viewBox="0 0 80 80">
            <circle id="test" cx="40" cy="40" r="32"></circle>
          </svg>
        </div>

        <div class="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>

        <div class="loader">
          <svg viewBox="0 0 80 80">
            <rect x="8" y="8" width="64" height="64"></rect>
          </svg>
        </div>
      </div>

      <transition-group name="fade">
        <ActionSpinnerAnimation
          key="1"
          v-if="showActionSpinner || propsActionSpinner "
          :data="ActionSpinnerData"
        />
        <ActionModal
          key="2"
          v-if="showActionModal || propsActionModal"
          @closeAction="showActionModal = false"
          :data="ActionModalData"
        />
        <WarningModal
          key="3"
          v-if="showWarning"
          action="remove"
          :data="warningData"
          @CancelDelete="showWarning = false"
          @ClickDelete="clickDelete"
        />
      </transition-group>
      <transition name="fade">
        <AddQuestion v-if="showAddQuestionModal"
        :question="selectedQuestion"
        :option="option"
        :showActionModal="sAm"
        :showActionSpinner="sAs"
        @close="showAddQuestionModal = false"
        @save="saveQuestion"
        @edit="updateQuestion"
        />
        
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref ,onMounted} from "vue";
import {useQuestionStore} from "../stores/question"
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";
import WarningModal from "./WarningModal.vue";
import AddQuestion from "./AddQuestion.vue";

const questionStore = useQuestionStore()
const questions = ref([])
const showData = ref(false)

const emits = defineEmits(["close", "removeCriteria", "editCriteria"]);
const props = defineProps([
  "criteria",
  "showActionSpinner",
  "showActionModal",
]);


const sAm= ref(false) // ShowActionModal
const sAs = ref(false) // ShowActionSpinner
const selectedQuestion = ref([])
const option= ref('')
const showWarning = ref(false);
const warningData = ref("");
const propsCriteria = ref(props.criteria);
const currentData = ref("");
const questionId = ref(0);
const ActionSpinnerData = ref("");
const ActionModalData = ref("");
const showAddQuestionModal = ref(false);
const propsActionSpinner = ref(false)
const propsActionModal = ref(false)


const showWarningClick = (data, id) => {
  warningData.value = data;
  showWarning.value = true;
  currentData.value = data;
  questionId.value = id;
};

const clickDelete = () => {
  showWarning.value = false;
  ActionSpinnerData.value = "Deleting";
  ActionModalData.value = "Deleted";
  if (currentData.value == "Criteria") {
    emits("removeCriteria", propsCriteria.value.id);
  } else {
    removeQuestion()
  }
};

const removeQuestion = async()=>{
  propsActionSpinner.value = true
  await questionStore.removeQuestion(questionId.value)
  propsActionSpinner.value = false
  if(questionStore.isSuccess){
    propsActionModal.value = true
    setTimeout(()=>{
      questions.value = questionStore.questions
      propsActionModal.value = false
    },1500)
  }else{
    alert("Something went wrong")
  }
}

const addQuestionClick = ()=>{
  option.value = 'Add'
  showAddQuestionModal.value = true
}

const editQuestion = (val)=>{
  option.value = 'Edit'
  selectedQuestion.value = val
  showAddQuestionModal.value = true
}

const updateQuestion = async(val)=>{
  console.log(val)
  console.log(selectedQuestion.value.id)
  sAs.value = true
  await questionStore.saveUpdateQuestion(selectedQuestion.value.id,val)
  sAs.value = false
  if(questionStore.isSuccess){
    sAm.value = true
    setTimeout(()=>{
      questions.value = questionStore.questions
      sAm.value = false
      showAddQuestionModal.value = false
    },1000)
  }else{
    alert("Something went wrong")
  }
}

const editCriteria = () => {
    emits("editCriteria");
};

const saveQuestion = async(val)=>{
  sAs.value = true
  await questionStore.addQuestion(propsCriteria.value.id,val)
  sAs.value = false
  if(questionStore.isSuccess){
    sAm.value = true
    setTimeout(()=>{
      questions.value = questionStore.questions
      sAm.value = false
      showAddQuestionModal.value = false
    },1000)
  }else{
    alert("Something went wrong")
  }
}

onMounted(async()=>{
  await questionStore.fetchQuestionFromCriteria(propsCriteria.value.id);
  questions.value = questionStore.questions
  showData.value = true
})
</script>









<style scoped>
@media (min-width: 640px) {
  .loader {
    left: 120px;
  }
}
</style>

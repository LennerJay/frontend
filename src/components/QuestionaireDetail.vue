<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins" style="z-index: 10000"
  >
    <div
      class="relative bg-white pl-5 pr-5 md:max-w-lg max-w-sm mx-auto  md:mt-12 border-4 border-sky-950 rounded-xl max-h-[45rem] overflow-y-auto"
    >

      <transition name="slide-fade">
        <div class="absolute w-11/12 top-5 left-5 z-20" v-if="showResponseError">
          <div class="bg-red-100 border border-red-400 text-red-700 px-5 py-3 rounded relative" role="alert">
            <strong class="font-bold block">Warning</strong>
            <span class="block sm:inline">This questionnaire cannot be used because it contains no questions</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="showResponseError = false" >
              <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
      
        </div>
      </transition>
      <div class="container w-full mt-6">
        <div class="flex justify-between items-center">
          <div>Questionaire Details</div>
          <div class="mr-3">
            <button @click="closeModal" id="close-btn">
              <i class="bi bi-x-lg"></i>
              <span></span>
            </button>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex items-center mb-5 gap-2">
            <label
              class="text-left block text-gray-500 font-bold mb-1 md:mb-0 pr-4 flex-grow min-w-[120px]"
              for="questionaire-entity"
            >
              For
            </label>

            <select
              v-model="entityId"
              name="questionaire-entity"
              id="questionaire-entity"
              :disabled="isEnable"
              class="w-full h-full capitalize bg-transparent text-blue-gray-700 font-poppins  font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            >
              <option
                v-for="(entity, entityIndex) in entities"
                :key="entityIndex"
                :value="entity.id"
              >
                {{ entity.entity_name }}
              </option>
            </select>
          </div>
          <div class="flex items-center">
            <span class="text-white invisible">.</span>
            <Transition name="fade" appear>
              <span v-if="errors.entityId" class="text-rose-600">{{ errors.entityId }}</span>
            </Transition>
          </div>
        </div>

        <div class="flex flex-col mb-2">
          <div class="flex items-center mb-2 gap-2">
            <label
              class="text-left block text-gray-500 font-bold mb-1 md:mb-0 pr-4 flex-grow min-w-[120px]"
              for="title"
            >
              Title
            </label>
            <input
              @input="titleInput"
              id="title"
              v-model="title"
              :disabled="isEnable"
              class="w-full h-full bg-transparent text-blue-gray-700 font-poppins  font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            />
          </div>
          <div class="flex items-center gap-5">
            <span class="flex-grow min-w-[120px] invisible">.</span>
            <Transition name="fade" appear>
              <span class="w-full text-rose-600" v-if="errors.title">{{ errors.title }}</span>
            </Transition>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex items-start mb-2 gap-2">
            <label
              class="pt-2 text-gray-500 font-bold text-left mb-1 md:mb-0 pr-4 flex-grow min-w-[120px]"
              for="questionaire-description"
            >
              Description
            </label>
            <textarea
              @input="descriptionInput"
              v-model="description"
              rows="3"
              id="questionaire-description"
              :disabled="isEnable"
              class="w-full h-full capitalize bg-transparent text-blue-gray-700 font-poppins  font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            />
          </div>
          <div class="flex items-center gap-5">
            <span class="flex-grow min-w-[120px] invisible">.</span>
            <transition name="fade">
              <span class="w-full text-rose-600" v-if="errors.description">{{
                errors.description
              }}</span>
            </transition>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex items-center mb-2 gap-2">
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
              :disabled="isEnable"
              class="w-full h-full bg-transparent text-blue-gray-700 font-poppins  font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            />
          </div>
          <div class="flex items-center gap-5">
            <span class="flex-grow min-w-[120px] invisible">.</span>
            <transition name="fade">
              <span class="w-full text-rose-600" v-if="errors.semester">{{ errors.semester }}</span>
            </transition>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex items-center mb-2 gap-2">
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
              :disabled="isEnable"
              class="w-full h-full bg-transparent text-blue-gray-700 font-poppins  font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            />
          </div>
          <div class="flex items-center gap-5">
            <span class="flex-grow min-w-[120px] invisible">.</span>
            <transition name="fade">
              <span class="w-full text-rose-600" v-if="errors.schoolYear">{{ errors.schoolYear }}</span>
            </transition>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex items-center mb-2 gap-2">
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
              :disabled="isEnable"
              class="w-full h-full bg-transparent text-blue-gray-700 font-poppins  font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            />
          </div>
          <div class="flex items-center gap-5">
            <span class="flex-grow min-w-[120px] invisible">.</span>
            <transition name="fade">
              <span class="w-full text-rose-600" v-if="errors.maxRespondents">{{
                errors.maxRespondents
              }}</span>
            </transition>
          </div>
        </div>

        <div class="flex items-center mt-5 gap-5">
          <label
            class="block text-gray-500 font-bold text-left mb-1 md:mb-0 pr-4 flex-grow min-w-[120px]"
            for="questionaire-status"
          >
            Status
          </label>
          <input
            id="questionaire-status"
            disabled
            class="w-full h-full bg-transparent text-blue-gray-700 font-poppins  font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            :value="selectedQuestionaire.status == 1 && qIndex == 0 ?  'Currently Used' : selectedQuestionaire.status == 1 ? 'Used':'Unused'"
          />
        </div>
      </div>

      <div class="flex justify-end mt-5 mb-5 gap-6 items-center">
        <transition name="bounce" appear>
          <p v-if="isInvalid" class="text-rose-600">Nothing's Change</p>
        </transition>
        <button v-if="!status" class="border border-black p-1" id="back-button" @click="updateStatus">
            Use 
        </button>
        <button
          class="border border-black p-1"
          id="back-button"
          @click="handleCancelClick"
        >
          {{ isEnable ? "Edit" : "Cancel" }}
        </button>
        <button
          v-if="isEnable"
          class="border border-black p-1"
          id="back-button"
          @click="closeModal"
        >
          Back
        </button>
        <button
          v-else
          class="border border-black p-1"
          id="back-button"
          @click="updateQuestionaire"
        >
          Save
        </button>
      </div>
      <TransitionGroup name="fade">
        <ActionSpinnerAnimation v-if="showActionSpinner" data="Updating" />
        <ActionModal
          v-if="showActionModal"
          data="Updated"
          @closeAction="showActionModal = false"
        />
      </TransitionGroup>
    </div>
  </div>

  <!-- End of container -->
</template>

<script setup>
import { ref } from "vue";
import { useQuestionaireStore } from "../stores/questionaire";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";

const questionaireStore = useQuestionaireStore();


const showResponseError = ref(false);
const isEnable = ref(true);
const showActionSpinner = ref(false);
const showActionModal = ref(false);
const entityId = ref(props.selectedQuestionaire.entity_id);
const title = ref(props.selectedQuestionaire.title);
const description = ref(props.selectedQuestionaire.description);
const semester = ref(props.selectedQuestionaire.semester);
const schoolYear = ref(props.selectedQuestionaire.school_year);
const maxRespondents = ref(props.selectedQuestionaire.max_respondents);
const status = ref(props.selectedQuestionaire.status);
const errors = ref({});
const isInvalid = ref(false);

const handleCancelClick = () => {
  console.log(props.selectedQuestionaire);
  if (compareData() && !isEnable.value) {
    if (confirm("Change will not be Save") == true) {
      isEnable.value = !isEnable.value;
      restoreDataInputs();
    }
  } else {
    isEnable.value = !isEnable.value;
  }
};


const restoreDataInputs = () => {
  entityId.value = props.selectedQuestionaire.entity_id;
  title.value = props.selectedQuestionaire.title;
  description.value = props.selectedQuestionaire.description;
  semester.value = props.selectedQuestionaire.semester;
  schoolYear.value = props.selectedQuestionaire.school_year;
  maxRespondents.value = props.selectedQuestionaire.max_respondents;
  status.value = ref(props.selectedQuestionaire.status);
};

const emits = defineEmits(["backButton"]);
const props = defineProps({
  selectedQuestionaire: Object,
  entities: Object,
  qIndex:Number
});

const closeModal = () => {
  if (!isEnable.value) {
    if (confirm("Are you sure you want to close?") == true) {
      emits("backButton");
    }
  } else {
    emits("backButton");
  }
};

const updateQuestionaire = async () => {
  if (!compareData()) {
    isInvalid.value = true;
    setTimeout(() => {
      isInvalid.value = false;
    }, 1500);
    return;
  }
  if (validateInputs()) {
    return;
  }
  const qId = props.selectedQuestionaire.id;
  const data = {
    entity_id: entityId.value,
    title: title.value,
    description: description.value,
    semester: semester.value,
    school_year: schoolYear.value,
    max_respondents: maxRespondents.value,
    status: props.selectedQuestionaire.status,
  };
  showActionSpinner.value = true;
  await questionaireStore.questionaireUpdate(qId, data);
  showActionSpinner.value = false;
  if (questionaireStore.isSuccess) {
    showActionModal.value = true;
    setTimeout(() => {
      showActionModal.value = false;
    }, 1000);
    isEnable.value = true;
  }
};

const updateStatus = async () => {
  showActionSpinner.value = true;
  await questionaireStore.updateStatus(props.selectedQuestionaire.id);
  showActionSpinner.value = false;
  if (!questionaireStore.isUpdateSuccess) {
    showResponseError.value = true;
    setTimeout(() => {
      showResponseError.value = false;
    }, 4000);

    return;
  }
  if (questionaireStore.isSuccess) {
    showActionModal.value = true;
    setTimeout(() => {
      showActionModal.value = false;
      closeModal();
    }, 1000);
    isEnable.value = true;
  }
};

const compareData = () => {
  //if the data is change returns true
  return (
    props.selectedQuestionaire.entity_id != entityId.value ||
    props.selectedQuestionaire.title != title.value ||
    props.selectedQuestionaire.description != description.value ||
    props.selectedQuestionaire.semester != semester.value ||
    props.selectedQuestionaire.school_year != schoolYear.value ||
    props.selectedQuestionaire.max_respondents != maxRespondents.value
  );
};

const validateInputs = () => {
  let isError = false;
  if (entityId.value == "") {
    errors.value.entityId = "Please Choose";
    isError = true;
  }
  if (title.value == "") {
    errors.value.title = "Input title";
    isError = true;
  }
  if (description.value == "") {
    errors.value.description = "Input Description";
    isError = true;
  }
  if (semester.value == "") {
    errors.value.semester = "Input Semester";
    isError = true;
  }
  if (schoolYear.value == "") {
    errors.value.schoolYear = "Input School Year";
    isError = true;
  }
  if (maxRespondents.value == "") {
    errors.value.maxRespondents = "Input max respondents";
    isError = true;
  }

  return isError;
};

const titleInput = () => {
  errors.value.title = "";
};
const descriptionInput = () => {
  errors.value.description = "";
};
const semesterInput = () => {
  errors.value.semester = "";
};
const schoolYearInput = () => {
  errors.value.schoolYear = "";
};

const maxRespondentsInput = () => {
  errors.value.maxRespondents = "";
};
</script>

<style scoped>

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

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

select:disabled::ms-expand {
  display: none; /* for Edge and IE */
}

select:disabled::-ms-expand {
  display: none; /* for Edge and IE */
}

select:disabled {
  appearance: none;
}
</style>

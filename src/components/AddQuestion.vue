<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-50"
  >
    <div
      class="relative bg-white pl-5 pr-5 md:max-w-2xl max-w-sm mx-auto md:mt-40 mt-12 border-4 border-sky-950 rounded-xl max-h-[42rem] overflow-y-auto"
    >
      <div class="container w-full mt-6">
        <div class="flex justify-between items-center">
          <div>{{ option }} Question</div>
          <div>
            <button @click="closeModal" id="close-btn">
              <i class="bi bi-x-lg"></i>
              <span></span>
            </button>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex items-start mb-2 mt-2 gap-5">
            <label
              class="pt-2 text-gray-500 font-bold text-left mb-1 md:mb-0 pr-4 flex-grow min-w-[120px]"
              for="question"
            >
              Question
            </label>
            <textarea
              rows="3"
              @input="questionInput"
              v-model="question"
              id="question"
              class="w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            />
          </div>
          <div class="flex items-center gap-5">
            <span class="flex-grow min-w-[120px] invisible">.</span>
            <transition name="fade">
              <span class="w-full pl-3" v-if="errors.question">{{
                errors.question
              }}</span>
            </transition>
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-5 mb-5 gap-6">
        <button class="border border-black p-1" id="back-button" @click="closeModal">
          Back
        </button>
        <button class="border border-black p-1" id="back-button" @click="saveQuestion">
          Save
        </button>
      </div>

      <transition-group name="fade">
        <ActionSpinnerAnimation key="1" v-if="showActionSpinner" data="Saving" />
        <ActionModal v-if="showActionModal" data="Save" @closeAction="closeModal" />
      </transition-group>
    </div>
  </div>

  <!-- End of container -->
</template>

<script setup>
import { ref } from "vue";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";

const question = props.question ? ref(props.question.question) : ref("");

const errors = ref({});
const emits = defineEmits(["close","save","edit"]);
const props = defineProps(["question", "option","showActionSpinner","showActionModal"]);

const saveQuestion = async ()=>{
    if(question.value == ''){
        errors.value.question = "Please enter a question" 
        return;
    }
    if(props.option == 'Add'){
      emits('save', question.value)
    }else{
      emits('edit', question.value)
    }
   
}

const questionInput = () => {
  errors.value.description = "";
};


const closeModal = () => {
  if (
    question.value == "" ||
    (question.value == undefined && props.option == "Add")
  ) {
    emits("close");
  } else if (confirm("Are you sure you want to close?") == true) {
    emits("close");
  }
};
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

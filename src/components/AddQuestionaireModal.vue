<template>
    <div
      class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-20"
    >
      <div
        class="relative bg-white pl-5 pr-5 md:max-w-2xl max-w-sm mx-auto mt-48 border-4 border-sky-950 rounded-xl max-h-[30rem] overflow-y-auto"
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
          <div class="flex items-center mb-6 mt-5 gap-5">
            <label 
                class="text-left block text-gray-500 font-bold  mb-1 md:mb-0 pr-4 flex-grow min-w-[120px]"
                for="title"
              >
              Title 
              </label>
            <input
                id="title"
                
                class=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                :value="selectedQuestionaire.title"
              />
          </div>
    
          <div class="flex items-center mb-6 mt-5 gap-5">
            <label 
                class="block text-gray-500 font-bold text-left  mb-1 md:mb-0 pr-4  flex-grow min-w-[120px]"
                for="description"
              >
              Description 
              </label>
            <input
                id="description"
                
                class=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                :value="selectedQuestionaire.description"
              />
          </div>
          <div class="flex items-center mb-6 mt-5 gap-5">
            <label 
                class="block text-gray-500 font-bold text-left  mb-1 md:mb-0 pr-4  flex-grow min-w-[120px]"
                for="semester"
              >
              Semester 
              </label>
            <input
                id="semester"
                
                class=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                :value="selectedQuestionaire.semester"
              />
          </div>
          <div class="flex items-center mb-6 mt-5 gap-5">
            <label 
                class="block text-gray-500 font-bold text-left  mb-1 md:mb-0 pr-4  flex-grow min-w-[120px]"
                for="school-year"
              >
              School Year 
              </label>
            <input
                id="school-year"
                
                class=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                :value="selectedQuestionaire.school_year"
              />
          </div>
          <div class="flex items-center mb-6 mt-5 gap-5">
            <label 
                class="block text-gray-500 font-bold text-left  mb-1 md:mb-0 pr-4  flex-grow min-w-[120px]"
                for="description"
              >
              Max Respondents 
              </label>
            <input
                id="description"
                
                class=" w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                :value="selectedQuestionaire.max_respondents"
              />
          </div>
    
        </div>
  
        <div class="flex justify-end mt-5 mb-5 gap-6">
          <button
            class="border border-black p-1"
            id="back-button"
            @click="emits('backButton')"
          >
            Use
          </button>
          <button
            class="border border-black p-1"
            id="back-button"
            @click="emits('backButton')"
          >
            Edit
          </button>
          <button
            class="border border-black p-1"
            id="back-button"
            @click="emits('backButton')"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  
    <!-- End of container -->
  </template>
  
  <script setup>
  // import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
  // import ActionModal from "./ActionModal.vue";
  // import WarningModal from "./WarningModal.vue";
  
  // const showActionSpinner = ref(false);
  // const showActionModal = ref(false);
  // const showWarningModal = ref(false);
  // const actionSpinnerData = ref("");
  // const actionData = ref("");
  const emits = defineEmits(["backButton"]);
  
  const props = defineProps({
    selectedQuestionaire: Object,
  });
  </script>
  
  <style scoped>
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
  
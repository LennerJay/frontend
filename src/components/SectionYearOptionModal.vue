<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins" style="z-index: 10000"
  >
    <div
      class="relative bg-white p-8 max-w-md mx-auto mt-48 border-4 border-sky-950 rounded-xl max-h-[30rem] overflow-y-auto overflow-x-hidden"
    >
    <transition name="slide-fade">
          <div class="absolute w-11/12 top-3 left-5 z-20" v-if="showResponseError" >
          <div class="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded relative" role="alert">
            <strong class="font-bold mr-5">Warning</strong>
            <span class="block sm:inline text-rose-600">Year & Section already exist</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="showResponseError = false" >
              <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        </div>
    </transition>

      <button @click="closeModal" id="close-btn">
        <i class="bi bi-x-lg"></i>
        <span></span>
      </button>
      <div  class="mb-4 flex flex-col">
        <h2 class="text-2xl font-semibold text-center bg-sky-950 text-white mb-2">
          {{ action }} Year & Section
        </h2>
      </div>
      <div v-if="action == 'Add'"  class="flex flex-col">
          <div class="flex items-center mb-2 mt-2">
            <label
              class="text-left block text-gray-500 font-bold mb-1 md:mb-0 pr-4 flex-grow min-w-[90px]"
              for="option-name"
            >
              Name
            </label>
            <input
              @input="nameInput"
              v-model="name"
              id="option-name"
              placeholder="Eg. 1-C"
              class="w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            />
          </div>
          <div class="flex items-center ">
            <span class="flex-grow min-w-[90px] invisible">.</span>
            <transition-group name="fade">
              <span class="w-full pl-3 text-rose-600" v-if="isError"> Please enter a year and section</span>
              <span class="w-full pl-3 text-rose-600" v-if="isInvalid"> Invalid Input </span>
            </transition-group>
          </div>
      </div>
      <div v-else class="flex flex-col">
       <h1 class="font-semibold">Year : {{ data.year }}</h1>
        <table class="text-center mt-2">
          <thead class="border border-gray-400">
              <th class="border-r border-gray-400">Sections</th>
              <th>Actions</th>
          </thead>
          <tbody class="border border-gray-400">
            <tr v-for="section in data.sections" class="border-b border-gray-400">
                <td class="border-r border-gray-400">{{ section }}</td>
                <td><button @click="deleteSection(section)"><i class="bi bi-trash text-gray-500"></i></button></td>
            </tr>
          </tbody>
        </table>
      </div>
        <div class="flex justify-end space-x-4 mt-4 items-center">
          <Transition name="bounce" appear>
            <span v-show="noChangeError" class="font-bold mr-5 text-rose-600">Nothing's changed</span>
          </Transition>

          <button
            @click="closeModal"
            class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
          {{ action == 'Add' ? 'Cancel': 'Close' }}
          </button>
          <button 
            v-if="action == 'Add'"
            @click="handleSaveAction"
            class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
        <transition-group name="fade">
          <ActionSpinnerAnimation v-if="showActionSpinner" :data="actionSpinnerData" />
          <ActionModal v-if="showActionModal" :data="actionModalData" @closeAction="closeModal" />
        </transition-group>
        
    </div>
  </div>
</template>

<script setup>
import {ref,computed,watch} from "vue"
import { useSectionYearStore } from "../stores/sectionYear";
import ActionModal from "./ActionModal.vue";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";

const sectionYearStore = useSectionYearStore()

const isError = ref(false)
const isInvalid = ref(false)
const showResponseError = ref(false)
const showActionModal = ref(false)
const showActionSpinner = ref(false)
const actionModalData = ref('')
const actionSpinnerData = ref('')
const noChangeError = ref(false)
const name = ref(null);


const deleteSection= async(section)=>{
  if(confirm('Are you sure want to delete?')==false){
    return;
  }

  const sy = `${props.data.year}-${section}`
  const res = sectionYearStore.sectionYears.find(val => val.year_section == sy)
  actionModalData.value = 'Deleted'
  actionSpinnerData.value = 'Deleting'
  showActionSpinner.value = true
  await sectionYearStore.deleteSectionYears(res.id)
  showActionSpinner.value = false
  if(sectionYearStore.isSuccess){
    showActionModal.value = true
    setTimeout(()=>{
      showActionModal.value = false
      closeModal()
    },1500)
  }else{
    alert('Something went wrong')
  }
}

const nameInput = ()=>{
 isError.value = false
 if(validateInput()){
    isInvalid.value = false;
    
  }else{
    isInvalid.value = true;
  }
}

const props = defineProps([
  'action',
  'data'
])
const emits = defineEmits([
  'close'
])

const closeModal= ()=>{
  if(name.value == null || name.value == '') {
    emits('close')
    return
  }
  if(confirm('Are you sure you want to close?') == true){
    emits('close')
  }

}

const handleSaveAction= async()=>{
  if (name.value == "") {
    isError.value = true;
    return;
  }
  if(!validateInput()){
    isInvalid.value = true;
    return;
  }
  actionModalData.value = 'Saved'
  actionSpinnerData.value = 'Saving'
  showActionSpinner.value = true
  await sectionYearStore.saveSectionYears(name.value)
  showActionSpinner.value = false
  if(sectionYearStore.isResponseSuccess){
    showActionModal.value= true
    setTimeout(()=>{
      showActionModal.value= false
      name.value=''
      closeModal()
    },2000)
  }else{
    showResponseError.value = true
    setTimeout(()=>{
      showResponseError.value= false

    },2000)
  }
  
}
const validateInput = () =>{
  const pattern = /^\d+-[a-zA-Z]$/;
  return pattern.test(name.value);
}


const capitalizedInput = computed(() => {
  if (name.value.length < 3) return name.value;
  return name.value.slice(0, -1) + name.value[name.value.length - 1].toUpperCase();
});

watch(name, () => {
  capitalizeLast()
});
const capitalizeLast = () => {
  name.value = capitalizedInput.value;
};



</script>

<style  scoped>
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
  left: 95%;
  bottom: 15px;
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
.overflow-y-auto::-webkit-scrollbar {
  display: none;
  width: 0px;
}
.overflow-y-auto:hover::-webkit-scrollbar {
  display: block;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background-color: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgb(8, 47, 73, 1);
  border-radius: 8px;
  width: 4px;
}
</style>
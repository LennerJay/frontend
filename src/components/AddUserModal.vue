<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-40"
  >
    <div
      class="relative p-5 bg-white md:max-w-lg max-w-sm mx-auto md:mt-20 border-4 border-sky-950 rounded-xl max-h-[50rem] overflow-y-auto"
    >
      <div class="flex mt-7">
        <button @click="closeModal" id="close-btn">
          <i class="bi bi-x-lg"></i>
          <span></span>
        </button>
        <div>Add Student</div>
      </div>
      <div class="flex justify-center mt-5">
        <div>
          <label class="block text-gray-700 text-sm font-bold pb-1" for="user-department"
            >Department
          </label>
          <select
            v-model="department"
            @change="handleClickDepartment"
            class="cursor-pointer border rounded text-gray-700 w-full py-2 px-3"
            id="user-department"
            :disabled="isEnable"
          >
            <option hidden value="">Select Department</option>
            <option v-for="department in departments" :value="department.id">
              {{ department.name.toUpperCase() }}
            </option>
          </select>
          <div class="flex items-center">
            <span class="text-white invisible">.</span>
            <Transition name="fade" appear>
              <span v-if="errors.department">{{ errors.department }}</span>
            </Transition>
          </div>
        </div>
        <div class="">
          <label class="flex text-gray-700 text-sm font-bold mb-2" for="user-year-section"
            >Year & Section</label
          >
          <input
          :disabled="isEnable"
            v-model="sectionYear"
            @input="handleInputSectionYear"
            class="bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            id="user-year-section"
            type="text"
            placeholder="Eg. 1-C 2-C"
          />
          <div class="flex items-center">
            <span class="text-white invisible">.</span>
            <transition name="fade" appear>
              <span v-if="errors.sy">{{ errors.sy }}</span>
            </transition>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center mb-2 mt-2">
          <label
            class="text-left block text-gray-500 font-bold mb-1 md:mb-0 pr-4 flex-grow min-w-[90px]"
            for="option-name"
          >
            Id Number
          </label>
          <input
            @input="handleIdNumberInput"
            v-model="idNumber"
            type="number"
            id="option-name"
            class="w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
          />
          <button
            @click="handleAddAction"
            class="ml-5 bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>
        <div class="flex items-center">
          <span class="flex-grow min-w-[90px] invisible">.</span>
          <transition name="fade">
            <span class="w-full pl-3" v-if="errors.idNumber">
              {{ errors.idNumber }}</span
            >
          </transition>
        </div>
      </div>
      <div>
        <h1>Department : {{ selectedDepartment.name }}</h1>
        <h1>Year & Section: {{ selectedSectionYear.year_section }}</h1>
        <div>
          <h1>Id Numbers:</h1>
          <span>{{ selectedIdnumbers.join(", ") }}</span>
        </div>
      </div>
      <div class="flex justify-end mt-4 items-center gap-5">
        <button
          @click="closeModal"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
        <button
          :disabled="selectedIdnumbers.length == 0"
          @click="handlePreviewClick"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-sky-900"
        >
          Preview  
        </button>
      </div>

      <transition name="fade">
        <PreviewUser v-if="showPreview"
            :department='selectedDepartment'
            :sectionYear='selectedSectionYear'
            :idNumbers='selectedIdnumbers'
            :role_id='roleId'
        @closePreview="showPreview = false"
        @success="emits('close')"
        />
      </transition>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useRoleStore } from "../stores/role";
import { useDepartmentStore } from "../stores/department";
import { useSectionYearStore } from "../stores/sectionYear";
import PreviewUser from "./PreviewUser.vue";

const roleStore = useRoleStore()
const departmetStore = useDepartmentStore();
const SectionYearStore = useSectionYearStore();

const emits = defineEmits(["close"]);
const props = defineProps(['role'])

const departments = ref([]);
const sectionYears = ref([]);

const showPreview = ref(false)
const department = ref("");
const sectionYear = ref("");
const idNumber = ref("");
const selectedDepartment = ref("");
const selectedSectionYear = ref("");
const selectedIdnumbers = ref([]);
const errors = ref({});
const roleId = ref()
const isEnable = ref(false);

const closeModal = () => {
    console.log(selectedIdnumbers.value.length)
    if(idNumber.value !='' || selectedIdnumbers.value.length != 0 ){
        if(confirm("Datas will not be saved, Are you sure you want to close?") == true){
            emits("close");
        }
    }else{
        emits("close");
    }
    // if(idNumber.value =='' ){

    // }

};

const handleAddAction = () => {
    if(validateInputs()){
        return;
    }
    const findSectionYear = sectionYears.value.find(
      (item) => item.year_section === sectionYear.value
    );
    if (!findSectionYear ) {
      errors.value.sy = "Section not Registered";
      return;
    }
   if(!isEnable.value){
    selectedDepartment.value = departments.value.find(d => d.id == department.value)
    selectedSectionYear.value = findSectionYear
    isEnable.value = true
   }
    if(!selectedIdnumbers.value.includes(idNumber.value)){
        selectedIdnumbers.value.unshift(idNumber.value)
        idNumber.value = ''
    }else{
        errors.value.idNumber = "Id Number already exists"
    }
};
const validateInputs = ()=>{
    let isError = false;
    if(idNumber.value == ''){
        errors.value.idNumber =  ' Please enter an Id Number'
        isError = true;
    }
    if(!validateInput()){
        errors.value.sy = "Invalid"
        isError = true;
    }
    if(sectionYear.value == '' ){
        errors.value.sy = "Please enter a section & year"
        isError = true;
    }
    if (department.value == "" ) {
        errors.value.department = " Please select a department";
        isError = true;
    }

    return isError
}


const handlePreviewClick = () => {
     roleId.value = roleStore.roles.find( role => role.name == props.role).id

     showPreview.value = true

};

const handleInputSectionYear = () => {
    errors.value.sy = ""
  if (!validateInput()) {
    errors.value.sy = "Invalid"
  }
};

const handleClickDepartment = () => {
  errors.value.department = "";
};
const handleIdNumberInput = () => {
    errors.value.idNumber = ''

};

const validateInput = () => {
  const pattern = /^\d+-[a-zA-Z]$/;
  return pattern.test(sectionYear.value);
};

const capitalizedInput = computed(() => {
  if (sectionYear.value.length < 3) return sectionYear.value;
  return (
    sectionYear.value.slice(0, -1) +
    sectionYear.value[sectionYear.value.length - 1].toUpperCase()
  );
});

watch(sectionYear, () => {
  capitalizeLast();
});
const capitalizeLast = () => {
  sectionYear.value = capitalizedInput.value;
};


onMounted(async () => {
  if (departmetStore.departments.length == 0) {
    await departmetStore.getDepartments();
  }
  if (SectionYearStore.sectionYears.length == 0) {
    await SectionYearStore.fetchAllSectionYears();
  }
  departments.value = departmetStore.departments;
  sectionYears.value = SectionYearStore.sectionYears;
});
</script>

<style scoped>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        display: none;
    }
.loader {
  left: 72px;
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
  left: 94%;
  bottom: 20px;
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

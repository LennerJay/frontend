<template>
  <div class="flex">
    <div class="md:ml-[250px] h-screen w-screen">
      <div class="header-container">
        <header id="main-header">
          <span class="md:hidden flex">
            <i
              class="bi bi-filter-left px-5 p-1 rounded-md cursor-pointer text-white text-[30px]"
              @click="drawer.toggle"
            ></i>
          </span>
          <h1>Advance Options</h1>
          <p>Cordova Public College</p>
        </header>
        <div class="objects">
          <div class="object-content py-[25px] md:px-[15px]">
            <ul>
              <li>
                <button
                  @click="changeOption('Departments')"
                  type="button"
                  id="department"
                  name="department"
                >
                  Departments
                </button>
              </li>
              <li>
                <button
                  @click="changeOption('Year & Sections')"
                  type="button"
                  id="year-sec"
                  name="year_sec"
                >
                  Year & Sections
                </button>
              </li>
              <li>
                <button
                  @click="changeOption('Evaluatee Type')"
                  type="button"
                  id="entities"
                  name="entities"
                >
                  Evaluatees
                </button>
              </li>
              <li>
                <button
                  @click="changeOption('Subjects')"
                  type="button"
                  id="subject"
                  name="subject"
                >
                  Subjects
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button @click="showOptionModal('Add')" class="bg-sky-900 text-white rounded-full py-2 px-4 font-poppins text-[13px]
        hover:bg-white hover:text-black transition md:ml-[120px] ml-32">
          Add {{ currentOption }}
      </button>
      <!-- End of header-container -->

      <OptionTable
        :datas="datas"
        :name="currentOption"
        :showLoadingAnimations="showLoadingAnimations"
        :isNoData="isNoData"
        @action="showOptionModal"
      />
      <transition name="fade">
        <OptionModal
          v-if="showOption"
          :data="currentData"
          :action="action"
          :option="currentOption"
          @closeButton="closeOptionModal"
        />
  
      </transition >
      <transition name="fade">
        <SectionYearOptionModal 
        v-if="showSectionYearModal"
          :action="action"
          :data="currentData"
          @close="closeSectionYearModal"
        />
      </transition>
      <FooterCard />
    </div>

    <!-- End of main-container -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSubjectStore } from "../../stores/subject";;
import { useSectionYearStore } from "../../stores/sectionYear";
import { useDepartmentStore } from "../../stores/department";
import { useEntityStore } from "../../stores/entity";
import OptionModal from "../../components/OptionModal.vue";
import OptionTable from "../../components/OptionTable.vue";
import SectionYearOptionModal from "../../components/SectionYearOptionModal.vue";
import FooterCard from "../../components/FooterCard.vue";
import { useDrawerStore } from "../../stores/drawerStore";


const drawer = useDrawerStore();
const sectionYear = useSectionYearStore();
const subjectStore = useSubjectStore();
const entityStore = useEntityStore();
const departmentStore = useDepartmentStore();
const currentOption = ref("Departments");
const datas = ref([]);
const showLoadingAnimations = ref(false);
const isNoData = ref(false);
const action = ref("");
const currentData = ref([]);
const showOption = ref(false);
const showSectionYearModal = ref(false);

const showOptionModal = (val,data) => {
  if(currentOption.value == 'Year & Sections'){
    showSectionYearModal.value = true
    showOption.value = false;
  }else{
    showOption.value = true;
    showSectionYearModal.value = false
  }
  action.value = val;
  currentData.value= data
};
const closeSectionYearModal = ()=>{
  showSectionYearModal.value = false
  refreshData()
}
const closeOptionModal = ()=>{
  showOption.value = false
 
  refreshData()
}

const refreshData = ()=>{
  if(currentOption.value == 'Departments'){
    datas.value = departmentStore.departments
  }
  if(currentOption.value == 'Year & Sections'){
    datas.value = sectionYear.filterSectionYear()
  }
  if(currentOption.value == 'Evaluatee Type'){
    datas.value = entityStore.entities.map((item) => {
                        return { id: item.id, name: item.entity_name };
                      });
  }
  if(currentOption.value == 'Subjects'){
    datas.value = subjectStore.subjects
  }
}

const changeOption = async (value) => {
  isNoData.value = false;
  showLoadingAnimations.value = true;
  currentOption.value = value;
  localStorage.setItem("currentOption", value);
  await fetchOptions();
  showLoadingAnimations.value = false;

};

const fetchOptions = async () => {
  if (currentOption.value == "Departments") {
    if (departmentStore.departments.length == 0) {
      await departmentStore.getDepartments();
    }
    datas.value = departmentStore.departments;
  }

  if (currentOption.value == "Evaluatee Type") {
    if (entityStore.entities.length == 0) {
      await entityStore.fetchAllEntity();
    }
    datas.value = entityStore.entities.map((item) => {
      return { id: item.id, name: item.entity_name };
    });
  }

  if (currentOption.value == "Year & Sections") {
    if (sectionYear.sectionYears.length == 0) {
      await sectionYear.fetchAllSectionYears();
    }
    datas.value = sectionYear.filterSectionYear()
  }

  if (currentOption.value == "Subjects") {
    if (subjectStore.subjects.length == 0) {
      await subjectStore.fetchAllSubjects();
    }
    datas.value = subjectStore.subjects;
  }
  if (datas.value.length == 0) {
    isNoData.value = true;
  }
};

onMounted(async () => {
  showLoadingAnimations.value = true;
  if (localStorage.getItem("currentOption")) {
    currentOption.value = localStorage.getItem("currentOption");
  }
  await fetchOptions();
  showLoadingAnimations.value = false
  // console.log(datas.value.length)
  if (datas.value.length == 0) {
    isNoData.value = true;
  } 
});
</script>

<style scoped>
    /* Code Blocks Here */

    .main-container {
      overflow-y: scroll;
    }

    .header-container {
      width: 100%;
      margin: auto auto 40px auto;
      position: sticky;
      top: 0;
    }

    .header-container #main-header {
      background-color: #0c4a6e;
      padding: 15px 0 15px 0;
      color: #ffffff;
      text-align: center;
    }

    #main-header h1 {
      font-size: 22px;
      font-family: Verdana;
      font-weight: bold;
    }

    #main-header p {
      font-size: 14px;
      font-family: Helvetica, Georgia, "Times New Roman";
    }

    .header-container .objects {
      background-color: #e6e6e6;
      width: 100%;
      margin: auto;
    }

    .objects .object-content {
      color: #000000;
    }

    .objects .object-content ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .objects .object-content ul li {
      display: inline;
    }

    .objects .object-content ul li button {
      display: block;
      background-color: #0c4a6e;
      color: #ffffff;
      padding: 10px 18px;
      border: none;
      outline: none;
      font-family: Helvetica;
      border-radius: 35px;
      font-size: 13.5px;
    }

    .objects .object-content ul li button:hover {
      background-color: #ffffff;
      color: #000000;
      cursor: pointer;
      transition: all 0.3s ease 0s;
    }

    @media screen and (max-width: 768px) {
      .objects .object-content ul {
        flex-direction: column;
        margin-bottom: 5px;
      }

      .objects .object-content ul li {
        margin-bottom: 5px;
      }
    }
</style>

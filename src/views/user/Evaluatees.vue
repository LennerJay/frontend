<template>
  <div class="md:ml-[250px] ml-0 bg-sky-900 font-Times New Roman px-0 w-full">
    <div class="header pl-2  text-white ml-5">
        <div class="font-bold text-[30px]">
          <span class="inline-block md:hidden" @click="drawer.toggle">
            <i class="bi bi-filter-left px-5 p-1 bg-blue-800 rounded-md cursor-pointer"></i>
          </span>
            Cordova Public College
          <p class="text-lg">2023</p>
        </div>
      <div class="flex items-center pb-2">
        <label for="search" class="block text-whitepl-2 mr-2">Search:</label>
        <input
          type="text"
          id="search"
          class="w-50 h-6 p-2 border border-gray-300 rounded-md text-black"
          v-model="searchBar"
        />
      </div>
      <div class="selectTags flex items-center">
        <div>
          <SelectEntity :entities="entities" :entity="entity" @handleSelect="handleEntity"/>        
          </div>
        <div v-if="entity == 'instructor'">
          <SelectDepartment
          :departments="departments"
            :selectDepartment="selectDepartment"
            @handleSelectedDepartment="handleSelectedDepartment"
          />
        </div>
        <div>
          <SelectJobType
            :selectTypeJob="selectTypeJob"
            @jobTypeSelected="handleJobTypeSelected"
          />
        </div>
      </div>
    </div>
    <div class="min-h-screen card">
      <div v-if="showEvaluatee">
        <div class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5">
          <ProfileCard
            class="card-box"
            v-for="evaluatee in filteredEvaluatees"
            :evaluatee="evaluatee"
            :key="evaluatee.id"
            option="View"
            @selectedEvaluatee="selectedEvaluatee"
          />
        </div>
        <ModalCard v-if="showModal"
          :isInstructor="isInstructor"
          :showDetail="showDetail"
          :evaluateeInfo="evaluateeInfo"
          @close-modal="closeModal"
          class="modal-box"
        />
      </div>
      <div v-else class="pl-10 pr-[120px] max-h-[26rem] ml-20">
        <div class="loader3 mt-10 pt-24">
            <div class="circle1"><span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1">L</span></div>
            <div class="circle1"><span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1">O</span></div>
            <div class="circle1"><span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1">A</span></div>
            <div class="circle1"><span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1">D</span></div>
            <div class="circle1"><span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1">I</span></div>
            <div class="circle1"><span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1">N</span></div>
            <div class="circle1"><span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1">G</span></div>
          </div>
      </div>
    </div>

    <FooterCard />
  </div>
</template>

<script setup>
import { useEvaluateeStore } from "../../stores/evaluatee";
import { onBeforeMount,onMounted, ref, computed } from "vue";
import { useDrawerStore } from "../../stores/drawerStore";
import ProfileCard from "@/components/ProfileCard.vue";
import SelectDepartment from "../../components/SelectDepartment.vue";
import SelectJobType from "../../components/SelectJobType.vue";
import SelectEntity from "../../components/SelectEntity.vue";
import FooterCard from "@/components/FooterCard.vue";
import ModalCard from "../../components/ModalCard.vue";
import { useDepartmentStore } from "../../stores/department";
import { useEntityStore } from "../../stores/entity";
import LoadingAnimation from "../../components/LoadingAnimation.vue";

const entityStore = useEntityStore()
const departmentStore = useDepartmentStore();
const drawer = useDrawerStore();
const evaluateeStore = useEvaluateeStore();
const evaluatees = ref([]);
const showModal = ref(false);
const showDetail = ref(false);
const evaluateeInfo = ref([]);
const showEvaluatee = ref(false);
const isLoaded = ref(true);
const selectTypeJob = ref("All");
const selectDepartment = ref("All");
const searchBar = ref("");
const entity = ref("All");
const isInstructor= ref(false);
const departments= ref([]);
const entities = ref([]);

const loadedData = () => {
isLoaded.value = false;
// setTimeout(() => {
//     isLoaded.value = false
// }, 2000);
};

const closeModal = () => {
  showModal.value = false;
  showDetail.value = false;
  isInstructor.value = false;
};
const selectedEvaluatee = async (id) => {
  showModal.value = true;
  evaluateeInfo.value = await evaluateeStore.fetchEvaluateeInfo(id);
  if(evaluateeInfo.value.entity.entity_name === 'instructor'){
    isInstructor.value = true;
  }

  showDetail.value = true;
};

const handleEntity = (val)=>{
  entity.value = val;
  evaluatees.value = evaluateeStore.filterEvaluatees(
    entity.value,
    selectDepartment.value,
    selectTypeJob.value,
    "evaluation"
  );

}

const handleSelectedDepartment = (departmentName) => {
  selectDepartment.value = departmentName;
  evaluatees.value = evaluateeStore.filterEvaluatees(
    entity.value,
    selectDepartment.value,
    selectTypeJob.value,
    "evaluation"
  );
};

const handleJobTypeSelected = (val) => {
  selectTypeJob.value = val;
  evaluatees.value = evaluateeStore.filterEvaluatees(
    entity.value,
    selectDepartment.value,
    selectTypeJob.value,
    "evaluation"
  );
};



const filteredEvaluatees = computed(() => {
if (!searchBar.value) {
  return evaluatees.value;
}

return evaluatees.value.filter((data) =>
  data.name.toLowerCase().includes(searchBar.value.toLowerCase())
);
});

onBeforeMount(async () => {
  if(!localStorage.getItem('entities')){
    await entityStore.fetchAllEntity();
  }
  entities.value = entityStore.entities;
if(!localStorage.getItem("departments")){
  await departmentStore.getDepartments();
}
departments.value = departmentStore.departments;
if (!localStorage.getItem("allEvaluatees")) {
  await evaluateeStore.fetchAllEvaluatees();
  showEvaluatee.value = true;
}
evaluatees.value =evaluateeStore.filterEvaluatees(
    entity.value,
    selectDepartment.value,
    selectTypeJob.value,
    "evaluatees"
  );;

showEvaluatee.value = true;



loadedData();
});
</script>

<style scoped>
.select-dropdown {
z-index: 999;
}
.card-box {
z-index: 1;
}
.modal-box {
z-index: 1000;
}
.loading-screen {
z-index: 1000;
}
</style>

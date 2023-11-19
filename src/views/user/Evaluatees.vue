<template>
  <div class="flex">
    <div class="md:ml-[250px] ml-0 bg-sky-950 font-Times New Roman px-0 w-full">
      <LoadingAnimation v-if="isLoaded" class="loading-screen" />
      <div class="header pl-2 pt-2 text-white ml-5">
        <div class="font-bold p-1 text-[30px]">
          <span class="inline-block md:hidden" @click="drawer.toggle">
            <i
              class="bi bi-filter-left px-5 p-1 bg-blue-800 rounded-md cursor-pointer"
            ></i>
          </span>
          Cordova Public College
          <p class="text-lg">2023</p>
        </div>
        <div class="flex items-center">
          <label for="search" class="block text-gray-700 pl-2">Search:</label>
          <input
            type="text"
            id="search"
            class="w-full p-2 border border-gray-300 rounded-md"
            v-model="searchBar"
          />
        </div>
        <div class="selectTags flex">
          <div>
            <SelectTag
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
          <ModalCard
            :showModal="showModal"
            :showDetail="showDetail"
            :evaluateeInfo="evaluateeInfo"
            @close-modal="closeModal"
            class="modal-box"
          />
        </div>
        <div v-else>Loading Data</div>
      </div>

      <FooterCard />
    </div>
  </div>
</template>

<script setup>
import { useEvaluateeStore } from "../../stores/evaluatee";
import { onMounted, ref, computed } from "vue";
import { useDrawerStore } from "../../stores/drawerStore";
import ProfileCard from "@/components/ProfileCard.vue";
import SelectTag from "@/components/SelectTag.vue";
import SelectJobType from "../../components/SelectJobType.vue";
import FooterCard from "@/components/FooterCard.vue";
import ModalCard from "../../components/ModalCard.vue";
import LoadingAnimation from "../../components/LoadingAnimation.vue";

const drawer = useDrawerStore();
const evaluateeStore = useEvaluateeStore();
const evaluatees = ref([]);
const showModal = ref(false);
const showDetail = ref(false);
const evaluateeInfo = ref([]);
const showEvaluatee = ref(false);
const isLoaded = ref(true);
const selectTypeJob = ref("Both");
const selectDepartment = ref("All");
const searchBar = ref("");

const loadedData = () => {
  isLoaded.value = false;
  // setTimeout(() => {
  //     isLoaded.value = false
  // }, 2000);
};

const closeModal = () => {
  showModal.value = false;
  showDetail.value = false;
};
const selectedEvaluatee = async (id) => {
  showModal.value = true;
  evaluateeInfo.value = await evaluateeStore.fetchEvaluateeInfo(id);
  console.log(evaluateeInfo.value);
  showDetail.value = true;
};

const handleSelectedDepartment = (departmentName) => {
  selectDepartment.value = departmentName;
  evaluatees.value = evaluateeStore.filterEvaluatees(
    selectTypeJob.value,
    departmentName,
    "evaluatees"
  );
};

const handleJobTypeSelected = (val) => {
  selectTypeJob.value = val;
  evaluatees.value = evaluateeStore.filterEvaluatees(
    selectTypeJob.value,
    selectDepartment.value,
    "evaluatees"
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

onMounted(async () => {
  if (!localStorage.getItem("allEvaluatees")) {
    await evaluateeStore.fetchAllEvaluatees();
    showEvaluatee.value = true;
  }
  evaluatees.value = evaluateeStore.allEvaluatees;
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

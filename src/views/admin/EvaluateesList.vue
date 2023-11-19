<template>
  <div class="content">
    <h1 class="font-bold">Evaluatee List</h1>
    <div class="flex items-center justify-between mb-4 mt-10">
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
    <TableForm
      :data="filteredEvaluatees"
      :isNoData="isNoData"
      @handleActionClick="handleActionClick"
    ></TableForm>
    <ModalCard
      :showModal="showModal"
      :showDetail="showDetail"
      :evaluateeInfo="evaluateeInfo"
      :action="actionSelected"
      @close-modal="closeModal"
      class="modal-box"
    />
  </div>
</template>

<script setup>
import { useEvaluateeStore } from "../../stores/evaluatee";
import { ref, onMounted, computed } from "vue";
import TableForm from "../../components/TableForm.vue";
import SelectTag from "../../components/SelectTag.vue";
import SelectJobType from "../../components/SelectJobType.vue";
import ModalCard from "../../components/ModalCard.vue";

const searchBar = ref("");
const evaluateeStore = useEvaluateeStore();
const evaluatees = ref([]);
const isNoData = ref(true);
const openSelectTag = ref(false);
const selectDepartment = ref("All");
const selectRef = ref(null);
const selectTypeJob = ref("Both");
const showModal = ref(false);
const showDetail = ref(false);
const evaluateeInfo = ref([]);
const actionSelected = ref("");

const closeModal = () => {
  showModal.value = false;
  showDetail.value = false;
};

const selectedEvaluatee = async (id) => {
  showModal.value = true;
  evaluateeInfo.value = await evaluateeStore.fetchEvaluateeInfo(id);
  showDetail.value = true;
};

const handleActionClick = (id, action) => {
  if (action == "view") {
    selectedEvaluatee(id);
  }
};
const filteredEvaluatees = computed(() => {
  if (!searchBar.value) {
    return evaluatees.value;
  }

  return evaluatees.value.filter((data) =>
    data.name.toLowerCase().includes(searchBar.value.toLowerCase())
  );
});

const handleSelectTag = (event) => {
  if (selectRef.value == null) {
    return; // Exit early if event.target is null
  }
  if (!selectRef || !selectRef.value.contains(event.target)) {
    openSelectTag.value = false;
  }
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

onMounted(async () => {
  document.addEventListener("click", handleSelectTag);
  await evaluateeStore.fetchAllEvaluatees();
  if (evaluateeStore.errors.length == 0) {
    evaluatees.value = evaluateeStore.allEvaluatees;
    isNoData.value = false;
  }
});
</script>

<style lang="scss" scoped></style>

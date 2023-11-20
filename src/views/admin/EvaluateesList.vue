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
      <button
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Create User
      </button>
    </div>
    <div>
      <label for="selectPages">Page Size:</label>
      <select v-model="pageSize" @change="handlePageSizeChange" id="selectPages">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <EvaluateeListTable
      :data="filteredEvaluatees"
      :isNoData="isNoData"
      @handleActionClick="handleActionClick"
    ></EvaluateeListTable>

    <div>
      <span>{{ status }}</span>
      <div>
        <span
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          @click="gotoPage(pageNumber)"
          :class="{ active: pageNumber === currentPage }"
          >{{ pageNumber }}</span
        >
      </div>
    </div>
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
import EvaluateeListTable from "../../components/EvaluateeListTable.vue";
import TableForm from "../../components/TableForm.vue";
import SelectTag from "../../components/SelectTag.vue";
import SelectJobType from "../../components/SelectJobType.vue";
import ModalCard from "../../components/ModalCard.vue";

const searchBar = ref("");
const evaluateeStore = useEvaluateeStore();
const evaluatees = ref([]);
const isNoData = ref(true);
const selectDepartment = ref("All");
const selectTypeJob = ref("Both");
const showModal = ref(false);
const showDetail = ref(false);
const evaluateeInfo = ref([]);
const actionSelected = ref("");
const pageSize = ref("10");
const currentPage = ref(1);

const handlePageSizeChange = () => {
  currentPage.value = 1;
};

const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = currentPage.value * pageSize.value;
  return evaluatees.value.slice(startIndex, endIndex);
});
const totalPages = computed(() => Math.ceil(evaluatees.value.length / pageSize.value));
const status = computed(() => {
  const entriesStart = (currentPage.value - 1) * pageSize.value + 1;
  const entriesEnd = Math.min(
    currentPage.value * pageSize.value,
    evaluatees.value.length
  );
  return `Showing ${entriesStart} to ${entriesEnd} of ${evaluatees.value.length} entries`;
});
const gotoPage = (pageNumber) => {
  currentPage.value = pageNumber;
};

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
    return paginatedData.value;
  }

  return paginatedData.value.filter((data) =>
    data.name.toLowerCase().includes(searchBar.value.toLowerCase())
  );
});

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
  await evaluateeStore.fetchAllEvaluatees();
  if (evaluateeStore.errors.length == 0) {
    evaluatees.value = evaluateeStore.allEvaluatees;
    isNoData.value = false;
  }
});
</script>

<style lang="scss" scoped></style>

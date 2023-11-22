<template>
  <div class="md:ml-[250px] ml-0 font-serif px-0 w-full">
    <div class="header py-6 text-white text-center bg-sky-950">
      <div class="font-bold p-1 text-[30px]">
        <span class="inline-block md:hidden pr-5" @click="drawer.toggle">
          <i class="bi bi-filter-left px-5 p-1 bg-blue-900 rounded-md cursor-pointer"></i>
        </span>Evaluatee List
      </div>
    </div>
    <div class="card nav">
      <div class="flex flex-col min-h-[43.2rem]">
        <!--navar section -->
        <nav class="bg-gray-200 border-gray-200 dark:bg-gray-900 pb-2">
          <div class="max-w-full flex flex-wrap items-center justify-between mx-auto pt-4 pr-4">
            <div class="flex items-center space-x-3 rtl:space-x-reverse">
              <label for="search" class="block whitespace-nowrap dark:text-white px-2">Search:</label>
              <input
                type="text"
                id="search"
                class="w-full p-2 border border-gray-300 rounded-md h-6"
                v-model="searchBar"
              />
            </div>
            <button data-collapse-toggle="navbar-default"
              @click="navStore.showNavar"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden 
              hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700
              dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default" :class="{ 'visible': navStore.navarState }">
              <ul class="font-medium flex flex-col md:p-0  border border-gray-100 rounded-lg bg-gray-50 
                md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-200 dark:bg-gray-800 md:dark:bg-gray-900
                 dark:border-gray-700">
                <li>
                  <div class="selectTags pl-2 pb-2">
                    <SelectDepartment
                      :selectDepartment="selectDepartment"
                      @handleSelectedDepartment="handleSelectedDepartment"
                    />
                  </div>
                </li>
                <li>
                  <div class="selectTags pb-2">
                    <SelectJobType
                      :selectTypeJob="selectTypeJob"
                      @jobTypeSelected="handleJobTypeSelected"
                    />
                  </div>
                </li>
                <li>
                  <div class="selectTags pl-2 pb-2">
                    <button
                      class="bg-sky-950 hover:bg-blue-500 text-white hover:text-blue border
                    hover:border-transparent rounded w-28"
                      @click="crudModal.showCreateModal">
                      Create User
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <label for="selectPages" class="px-2">Page Size:</label>
            <select v-model="pageSize" @change="handlePageSizeChange" id="selectPages" class="rounded-2xl text-center">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </nav>
        <!--End of nav -->
        <!-- table area -->
        <EvaluateeListTable
          :data="filteredEvaluatees"
          :isNoData="isNoData"
          @handleActionClick="handleActionClick"
          class="card md:pt-20"
        />
        <div class="bg-gray-200 px-2">
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
         <!-- end table area -->
        <!-- Modal area -->
        <ModalCard
          :showModal="showModal"
          :showDetail="showDetail"
          :evaluateeInfo="evaluateeInfo"
          :action="actionSelected"
          @close-modal="closeModal"
          class="modal-box"
        />
        <CreateModal :addOpen="crudModal.modalAdd" @addNotOpen="addNotOpen"/>
        <EditModal :editOpen="crudModal.modalEdit" @editNotOpen="editNotOpen"/>
        <DeleteModal :deleteOpen="crudModal.modalDelete" @deleteNotOpen="deleteNotOpen"/>
      </div>
    </div>
    <FooterCard/>
  </div>
</template>

<script setup>
import { useEvaluateeStore } from "../../stores/evaluatee";
import { useDrawerStore } from '../../stores/drawerStore';
import { useNavarStore } from '../../stores/navarStore';
import { ref, onMounted, computed } from "vue";
import { userModalStore } from '../../stores/modalStore'
import EvaluateeListTable from "../../components/EvaluateeListTable.vue";
import SelectDepartment from "../../components/SelectDepartment.vue";
import SelectJobType from "../../components/SelectJobType.vue";
import ModalCard from "../../components/ModalCard.vue";
import CreateModal from '../../components/CreateModal.vue';
import EditModal from '../../components/EditModal.vue';
import DeleteModal from '../../components/DeleteModal.vue';
import FooterCard from '../../components/FooterCard.vue';

const crudModal = userModalStore();
const navStore = useNavarStore();
const drawer = useDrawerStore();
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

const addNotOpen = () => {
  crudModal.modalAdd = false
}

const editNotOpen = () => {
  crudModal.modalEdit = false
}

const deleteNotOpen = () => {
  crudModal.modalDelete = false
}

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
  else if (action == "edit"){
    console.log('Edit Click!');
    crudModal.modalEdit = true;
  }
  else if (action == "delete") {
    console.log('Delete Click!');
    crudModal.modalDelete = true;
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

<style scoped>
.visible {
    display: block !important;
  }
</style>

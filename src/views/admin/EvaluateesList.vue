<template>
  <div class="flex">
    <div class="md:ml-[250px] ml-0 font-poppins px-0 w-full">
      <div class="header md:py-6 md:pb-1 pb-2 text-white text-center bg-sky-900">
        <span class="md:hidden flex pt-2 pl-2">
          <i
            class="bi bi-filter-left px-5 p-1 bg-blue-900 hover:bg-blue-600 rounded-md cursor-pointer text-[30px] ml-2"
            @click="drawer.toggle"
          ></i>
        </span>
        <div class="font-bold p-1 text-[30px]">Evaluatee List</div>
      </div>
      <div class="card nav">
        <div class="flex flex-col min-h-[43.2rem]">
          <!--navar section -->
          <nav class="bg-gray-200 border-gray-200 dark:bg-gray-900 pb-2">
            <div
              class="max-w-full flex flex-wrap items-center justify-between mx-auto pt-4 pr-4"
            >
              <div class="flex items-center space-x-3 rtl:space-x-reverse">
                <label for="search" class="block whitespace-nowrap dark:text-white px-2"
                  >Search:</label
                >
                <input
                  type="text"
                  id="search"
                  class="w-full p-2 border border-gray-300 rounded-md h-6"
                  v-model="searchBar"
                />
              </div>
              <button
                data-collapse-toggle="navbar-default"
                @click="navStore.showNavar"
                type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
              <div
                class="hidden w-full md:block md:w-auto"
                id="navbar-default"
                :class="{ visible: navStore.navarState }"
              >
                <ul
                  class="font-medium flex flex-col md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-200 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                >
                  <li>
                    <div class="selectTags pl-2 pb-2" v-if="entity == 'instructor'">
                      <SelectDepartment
                        :departments="departments"
                        :selectDepartment="selectDepartment"
                        @handleSelectedDepartment="handleSelectedDepartment"
                      />
                    </div>
                  </li>
                  <li>
                    <div class="selectTags pl-2 pb-2">
                      <SelectEntity
                        :entities="entities"
                        :entity="entity"
                        @handleSelect="handleSelectEntity"
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
                        class="bg-sky-950 hover:bg-blue-500 text-white hover:text-blue border hover:border-transparent rounded w-28"
                        @click="HandleCreateButton"
                      >
                        Create
                        {{
                          entity === "All" || entity === "Instructor"
                            ? "Instructor"
                            : entity
                        }}
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <label for="selectPages" class="px-2">Page Size:</label>
              <select
                v-model="pageSize"
                @change="handlePageSizeChange"
                id="selectPages"
                class="rounded-2xl text-center"
              >
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
            :showDataAnimation="showDataAnimation"
            @handleActionClick="handleActionClick"
            class="card md:pt-20"
          />
          <!-- end table area -->
          <!-- Pagination -->
          <div class="bg-gray-200 px-2">
            <span class="text-gray-600">{{ status }}</span>
            <div class="mt-2 flex items-center pb-2">
              <!-- Previous Button -->
              <i
                class="bi bi-arrow-left-square cursor-pointer hover:bg-sky-950 hover:text-white transition duration-300"
                @click="gotoPage(currentPage - 1)"
                :class="{ '': currentPage > 1, 'mx-1 px-3 py-1': true }"
                v-if="currentPage > 1"
              >
              </i>

              <!-- Page Numbers -->
              <template v-for="pageNumber in displayPageRange">
                <span
                  @click="gotoPage(pageNumber)"
                  :class="{
                    'border-2 border-gray-400': pageNumber === currentPage,
                    'px-3 py-1 cursor-pointer hover:bg-sky-950 hover:text-white': true,
                  }"
                >
                  {{ pageNumber }}
                </span>
              </template>
              <!-- End Page Numbers -->

              <!-- Next Button -->
              <i
                class="bi bi-arrow-right-square cursor-pointer hover:bg-sky-950 hover:text-white transition duration-300"
                @click="gotoPage(currentPage + 1)"
                :class="{ '': currentPage < totalPages, 'mx-1 px-3 py-1': true }"
                v-if="currentPage < totalPages"
              >
              </i>
            </div>
          </div>
          <!-- End Pagination -->
          <!-- Modal area -->

          <transition name="fade">
            <ModalCard
              v-if="showModal"
              :noData="noData"
              :isInstructor="isInstructor"
              :showDetail="showDetail"
              :evaluateeInfo="evaluateeInfo"
              :evaluateeClasses="evaluateeClasses"
              :action="actionSelected"
              @close-modal="closeModal"
              @show-Add-Update-Modal="showAddUpdateModal"
              class="modal-box"
            />
          </transition>
          <transition name="fade">
            <AddUpdateClassModal
              v-if="showAddUpdate"
              :evaluateeInfo="evaluateeInfo"
              :subjects="subjects"
              :sectionYears="sectionYears"
              :departments="departments"
              :evaluateeClasses="evaluateeClasses"
              @closeAddUpdate="closeAddUpdateModal"
            />
          </transition>
          <transition name="fade">
            <CreateModal
              v-if="crudModal.modalAdd"
              :entities="entities"
              :entityId="entityId"
              :entity="entity"
              @handleCloseButton="handleCloseButton"
            />
          </transition>
          <transition name="fade">
            <EditModal
              v-if="crudModal.modalEdit"
              :subjects="subjects"
              :departments="departments"
              :entities="entities"
              :evaluateeDetails="evaluateeDetails"
              @closeEditModal="closeEditModal"
            />
          </transition>
          <transition name="fade">
            <DeleteModal
              :showDataAnimation="showDataAnimation"
              :evaluateeDetails="evaluateeDetails"
              :deleteOpen="crudModal.modalDelete"
              @closeDeleteModal="closeDeleteModal"
              @handleDelete="handleDeleteEvaluatee"
            />
          </transition>
        </div>
      </div>
      <FooterCard />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeMount } from "vue";
import { useEvaluateeStore } from "../../stores/evaluatee";
import { useDrawerStore } from "../../stores/drawerStore";
import { useNavarStore } from "../../stores/navarStore";
import { userModalStore } from "../../stores/modalStore";
import { useDepartmentStore } from "../../stores/department";
import { useEntityStore } from "../../stores/entity";
import { useSubjectStore } from "../../stores/subject";
import { useSectionYearStore } from "../../stores/sectionYear";
import EvaluateeListTable from "../../components/EvaluateeListTable.vue";
import SelectEntity from "../../components/SelectEntity.vue";
import SelectDepartment from "../../components/SelectDepartment.vue";
import SelectJobType from "../../components/SelectJobType.vue";
import ModalCard from "../../components/ModalCard.vue";
import CreateModal from "../../components/CreateModal.vue";
import EditModal from "../../components/EditModal.vue";
import DeleteModal from "../../components/DeleteModal.vue";
import AddUpdateClassModal from "../../components/AddUpdateClassModal.vue";
import FooterCard from "../../components/FooterCard.vue";

const subjectStore = useSubjectStore();
const sectionYearStore = useSectionYearStore();
const entityStore = useEntityStore();
const departmentStore = useDepartmentStore();
const crudModal = userModalStore();
const navStore = useNavarStore();
const drawer = useDrawerStore();
const searchBar = ref("");
const evaluateeStore = useEvaluateeStore();
const evaluatees = ref([]);
const isNoData = ref(false);
const selectDepartment = ref("All");
const selectTypeJob = ref("All");
const showModal = ref(false);
const showDetail = ref(false);
const evaluateeInfo = ref([]);
const actionSelected = ref("");
const pageSize = ref("10");
const currentPage = ref(1);
const isInstructor = ref(false);
const entity = ref("All");
const departments = ref([]);
const entities = ref([]);
const sectionYears = ref([]);
const subjects = ref([]);
const evaluateeClasses = ref([]);
const evaluateeDetails = ref([]);
const noData = ref(false);
const entityId = ref(1);
const showDataAnimation = ref(false);
const showAddUpdate = ref(false);

const showAddUpdateModal = () => {
  showModal.value = false;
  showAddUpdate.value = true;
};

const closeAddUpdateModal = () => {
  evaluateeInfo.value = [];
  showAddUpdate.value = false;
  closeModal();
};

const handleDeleteEvaluatee = () => {
  evaluatees.value = evaluateeStore.filterEvaluatees(
    entity.value,
    selectDepartment.value,
    selectTypeJob.value,
    "evaluatees"
  );
  closeDeleteModal();
};

const displayPageRange = computed(() => {
  const rangeStart = Math.max(currentPage.value - 2, 1);
  const rangeEnd = Math.min(rangeStart + 4, totalPages.value);

  return Array.from(
    { length: rangeEnd - rangeStart + 1 },
    (_, index) => rangeStart + index
  );
});

const handlePageSizeChange = () => {
  currentPage.value = 1;
};

const handleCloseButton = () => {
  evaluatees.value = evaluateeStore.filterEvaluatees(
    entity.value,
    selectDepartment.value,
    selectTypeJob.value,
    "evaluatees"
  );
  crudModal.modalAdd = false;
};

const closeEditModal = () => {
  evaluatees.value = evaluateeStore.filterEvaluatees(
    entity.value,
    selectDepartment.value,
    selectTypeJob.value,
    "evaluatees"
  );
  crudModal.modalEdit = false;
};

const closeDeleteModal = () => {
  crudModal.modalDelete = false;
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
  isInstructor.value = false;
};

const selectedEvaluatee = async (id) => {
  showModal.value = true;
  await evaluateeStore.fetchEvaluateeInfo(id);
  if (Object.keys(evaluateeStore.infoErrors).length == 0) {
    evaluateeClasses.value = [];
    evaluateeInfo.value = evaluateeStore.evaluateeInfo;
    evaluateeClasses.value = evaluateeStore.groupByDepartment();
    if (evaluateeInfo.value.entity_name === "instructor") {
      isInstructor.value = true;
    }
    showDetail.value = true;
  } else {
    noData.value = true;
  }
};

const handleActionClick = async (id, action) => {
  const findEvaluatee = evaluatees.value.find((evaluatee) => evaluatee.id === id);
  if (action == "view") {
    await selectedEvaluatee(id);
  } else if (action == "edit") {
    evaluateeDetails.value = findEvaluatee;
    console.log(evaluateeDetails.value);
    crudModal.modalEdit = true;
  } else if (action == "delete") {
    evaluateeDetails.value = findEvaluatee;
    console.log(evaluateeDetails.value);
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

const handleSelectEntity = (val) => {
  entity.value = val;
  if (val === "instructor") {
    isInstructor.value = true;
  } else {
    selectDepartment.value = "All";
  }
  evaluatees.value = evaluateeStore.filterEvaluatees(
    entity.value,
    selectDepartment.value,
    selectTypeJob.value,
    "evaluatee-list"
  );
};

const handleSelectedDepartment = (departmentName) => {
  selectDepartment.value = departmentName;
  evaluatees.value = evaluateeStore.filterEvaluatees(
    entity.value,
    selectDepartment.value,
    selectTypeJob.value,
    "evaluatee-list"
  );
};

const handleJobTypeSelected = (val) => {
  selectTypeJob.value = val;
  evaluatees.value = evaluateeStore.filterEvaluatees(
    entity.value,
    selectDepartment.value,
    selectTypeJob.value,
    "evaluatee-list"
  );
};

const HandleCreateButton = () => {
  entityId.value = 1;
  if (entity.value != "All") {
    const tmp = entities.value.find((obj) => obj.entity_name == entity.value);
    entityId.value = tmp.id;
  }

  crudModal.showCreateModal();
};

onBeforeMount(async () => {
  if (!localStorage.getItem("entities")) {
    await entityStore.fetchAllEntity();
  }
  if (!localStorage.getItem("departments")) {
    await departmentStore.getDepartments();
  }
  if (!localStorage.getItem("subjects")) {
    subjectStore.fetchAllSubjects();
  }
  if (!localStorage.getItem("sectionYears")) {
    sectionYearStore.fetchAllSectionYears();
  }
  subjects.value = subjectStore.subjects;
  sectionYears.value = sectionYearStore.sectionYears;
  entities.value = entityStore.entities;
  departments.value = departmentStore.departments;
});
onMounted(async () => {
  showDataAnimation.value = true;
  if (!localStorage.getItem("allEvaluatees")) {
    await evaluateeStore.fetchAllEvaluatees();
  }
  if (evaluateeStore.errors.length == 0) {
    evaluatees.value = evaluateeStore.filterEvaluatees(
      entity.value,
      selectDepartment.value,
      selectTypeJob.value,
      "evaluatees"
    );
    isNoData.value = false;
  } else {
    isNoData.value = true;
  }

  showDataAnimation.value = false;
});
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.visible {
  display: block !important;
}
</style>

<template>
  <div class="flex">
    <div class="md:ml-[250px] ml-0 font-poppins px-0 w-full">
      <div class="header md:py-4 text-white text-center bg-sky-900">
        <span class="md:hidden flex">
          <i
            class="bi bi-filter-left px-5 p-1 rounded-md cursor-pointer text-white text-[30px]"
            @click="drawer.toggle"
          ></i>
        </span>
        <h1>User List</h1>
        <p>Cordova Public College</p>
      </div>
      <div class="nav">
        <div class="flex flex-col min-h-[43.2rem]">
          <!--Navar Section -->
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
                  placeholder="ID Number"
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
                    <div class="selectTags pb-2 pl-2" v-if="isStudent">
                      <SelectYearSection
                        :sectionYear="sectionYear"
                        @handleSelectSY="handleSelectSY"
                      />
                    </div>
                  </li>
                  <li>
                    <div class="selectTags pl-2 pb-2">
                      <SortTag :sort="sort" @handleSelectRole="handleSelectRole" />
                    </div>
                  </li>
                  <li>
                    <div class="selectTags pb-2 pl-2" v-if="sort !== 'staff'">
                      <SelectDepartment
                        :selectDepartment="selectDepartment"
                        @handleSelectedDepartment="handleSelectedDepartment"
                      />
                    </div>
                  </li>

                  <li>
                    <div class="selectTags pl-2 pb-2">
                      <button
                        @click="showAddUserModal = true"
                        class="bg-sky-950 hover:bg-blue-500 text-white hover:text-blue border hover:border-transparent rounded w-28"
                      >
                        Add {{ sort }}
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="pt-2">
              <label for="selectPages" class="px-2">Page Size:</label>
              <select
                v-model="pageSize"
                @change="handlePageSizeChange"
                id="selectPages"
                class="rounded-2xl text-center"
              >
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </nav>
          <!--End of Nav -->
          <!-- Table Area -->
          <UserListTable
            :datas="filteredUsers"
            :isNoData="isNoData"
            :isStudent="isStudent"
            :showLoadingDataAnimation="showLoadingDataAnimation"
            @handleActionClick="handleActionClicked"
            class="md:h-full md:w-full"
          />
          <!-- End Table Area -->
          <!-- Pagination -->
          <div class="bg-sky-950 text-white px-2 mt-auto">
            <span class="text-white">{{ status }}</span>
            <div class="mt-2 flex items-center pb-2">
              <!-- Previous Button -->
              <i
                class="bi bi-arrow-left-square cursor-pointer hover:bg-gray-100 hover:text-gray-600 transition duration-300"
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
                    'px-3 py-1 cursor-pointer hover:bg-gray-100 hover:text-gray-600': true,
                  }"
                >
                  {{ pageNumber }}
                </span>
              </template>
              <!-- End Page Numbers -->

              <!-- Next Button -->
              <i
                class="bi bi-arrow-right-square cursor-pointer hover:bg-gray-100 hover:text-gray-600 transition duration-300"
                @click="gotoPage(currentPage + 1)"
                :class="{ '': currentPage < totalPages, 'mx-1 px-3 py-1': true }"
                v-if="currentPage < totalPages"
              >
              </i>
            </div>
          </div>
        </div>
      </div>
      <transition name="fade">
        <UserInfoModal
          v-if="showUserInfoModal"
          :showData="showData"
          :userInfo="userInfo"
          :showActionModal="showActionModal"
          :showActionSpinner="showActionSpinner"
          @close="showUserInfoModal = false"
          @removeClick="handeRemoveUserInfo"
        />
      </transition>
      <transition name="fade">
        <DeleteResetModal
          v-if="showDeleteResetModal"
          :action="currentAction"
          :userInfo="userInfo"
          :idNumber="currentId"
          :showData="showData"
          @closeDeleteResetModal="closeDeleteResetModal"
        />
      </transition>
      <transition name="fade">
        <AddUserModal v-if="showAddUserModal" :role="sort" @close="closeAddUser" />
      </transition>
      <FooterCard />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../../stores/users";
import { ref, onMounted, computed } from "vue";
import SelectYearSection from "../../components/SelectYearSection.vue";
import SortTag from "../../components/SortTag.vue";
import SelectDepartment from "../../components/SelectDepartment.vue";
import UserListTable from "../../components/UserListTable.vue";
import { useDrawerStore } from "../../stores/drawerStore";
import { useNavarStore } from "../../stores/navarStore";
import FooterCard from "../../components/FooterCard.vue";
import UserInfoModal from "../../components/UserInfoModal.vue";
import DeleteResetModal from "../../components/DeleteResetModal.vue";
import AddUserModal from "../../components/AddUserModal.vue";

const userStore = useUserStore();
const drawer = useDrawerStore();
const navStore = useNavarStore();
const searchBar = ref("");
const users = ref([]);
const selectDepartment = ref("All");
const sort = ref("student");
const sectionYear = ref("All");
const isNoData = ref(false);
const isStudent = ref(true);
const pageSize = ref("20");
const currentPage = ref(1);
const showLoadingDataAnimation = ref(false);
const showUserInfoModal = ref(false);
const showDeleteResetModal = ref(false);
const userInfo = ref([]);
const currentId = ref([]);
const currentAction = ref(0);
const showData = ref(false);
const showActionSpinner = ref(false);
const showActionModal = ref(false);
const showAddUserModal = ref(false);

const closeAddUser = () => {
  users.value = userStore.users;
  showAddUserModal.value = false;
};

const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = currentPage.value * pageSize.value;
  return users.value.slice(startIndex, endIndex);
});

const displayPageRange = computed(() => {
  const rangeStart = Math.max(currentPage.value - 2, 1);
  const rangeEnd = Math.min(rangeStart + 4, totalPages.value);

  return Array.from(
    { length: rangeEnd - rangeStart + 1 },
    (_, index) => rangeStart + index
  );
});

const totalPages = computed(() => Math.ceil(users.value.length / pageSize.value));
const status = computed(() => {
  const entriesStart = (currentPage.value - 1) * pageSize.value + 1;
  const entriesEnd = Math.min(currentPage.value * pageSize.value, users.value.length);
  return `Showing ${entriesStart} to ${entriesEnd} of ${users.value.length} entries`;
});

const gotoPage = (pageNumber) => {
  currentPage.value = pageNumber;
};

const filteredUsers = computed(() => {
  const searchTerm = searchBar.value?.trim().toLowerCase();

  if (!searchTerm) {
    return paginatedData.value;
  }

  return paginatedData.value.filter((user) => {
    const idNumber = user.id_number.toString().toLowerCase();
    return idNumber.includes(searchTerm);
  });
});

const handleSelectSY = (val) => {
  sectionYear.value = val;
  users.value = userStore.filterUsers(
    sort.value,
    selectDepartment.value,
    sectionYear.value
  );
};

const handleSelectRole = (val) => {
  sort.value = val;
  if (val == "student") {
    isStudent.value = true;
  } else {
    isStudent.value = false;
  }
  users.value = userStore.filterUsers(
    sort.value,
    selectDepartment.value,
    sectionYear.value
  );
  // console.log(users.value)
};

const handleSelectedDepartment = (val) => {
  selectDepartment.value = val;
  users.value = userStore.filterUsers(
    sort.value,
    selectDepartment.value,
    sectionYear.value
  );
};

const closeDeleteResetModal = () => {
  users.value = userStore.users;
  showDeleteResetModal.value = false;
};

const handleActionClicked = async (id, action) => {
  currentId.value = id;
  showData.value = false;
  userInfo.value = [];
  currentAction.value = action;

  if (action == "view") {
    showDeleteResetModal.value = false;
    showUserInfoModal.value = true;
  } else {
    showUserInfoModal.value = false;
    showDeleteResetModal.value = true;
  }

  if (userStore.userInfo.id_number != id) {
    await userStore.showUserDetails(id);
  }
  userInfo.value = userStore.userInfo;
  showData.value = true;
};

const handeRemoveUserInfo = async (id_number) => {
  showActionSpinner.value = true;
  await userStore.removeUserInfo(id_number);
  showActionSpinner.value = false;
  if (userStore.isSuccess) {
    showActionModal.value = true;
    setTimeout(() => {
      showActionModal.value = false;
      showUserInfoModal.value = false;
    }, 2000);
  } else {
    alert("Something went wrong");
  }
};

onMounted(async () => {
  showLoadingDataAnimation.value = true;
  if (userStore.users.length == 0) {
    await userStore.fetchAllUsers();
  }
  showLoadingDataAnimation.value = false;
  users.value = userStore.users;
  if (users.value.length > 0) {
    isNoData.value = false;
  } else {
    isNoData.value = true;
  }
});
</script>

<style scoped>
.header h1,
.header p {
  text-align: center;
}

.header h1 {
  font-size: 22px;
  font-family: Verdana;
  font-weight: bold;
}

.header p {
  font-size: 14px;
  font-family: Helvetica, Georgia, "Times New Roman";
}

.active {
  color: red;
}
.visible {
  display: block !important;
}
</style>

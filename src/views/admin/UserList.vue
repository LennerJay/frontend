<template>
  <div class="content">
    <h1 class="font-bold">User List</h1>
    <div class="flex items-center justify-between mb-4 mt-10">
      <div class="flex items-center">
        <label for="search" class="block text-gray-700 pl-2">Search:</label>
        <input
          type="text"
          id="search"
          placeholder="search by Id number or fullname"
          class="w-full p-2 border border-gray-300 rounded-md"
          v-model="searchBar"
        />
      </div>
      <div class="flex gap-4">
        <div class="selectTags flex">
          <div>
            <SortTag :sort="sort" @handleSelectRole="handleSelectRole" />
          </div>
          <div v-if="sort !== 'staff'">
            <SelectDepartment
              :selectDepartment="selectDepartment"
              @handleSelectedDepartment="handleSelectedDepartment"
            />
          </div>
          <div v-if="isStudent">
            <SelectYearSection
              :sectionYear="sectionYear"
              @handleSelectSY="handleSelectSY"
            />
          </div>
        </div>
        <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Add {{ sort }}
        </button>
      </div>
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
    <UserListTable
      :data="filteredUsers"
      :isNoData="isNoData"
      :isStudent="isStudent"
      @handleActionClick="handleActionClicked"
    ></UserListTable>
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
  </div>
</template>

<script setup>
import { useUserStore } from "../../stores/users";
import { ref, onMounted, computed } from "vue";
import SelectYearSection from "../../components/SelectYearSection.vue";
import SortTag from "../../components/SortTag.vue";
import SelectDepartment from "../../components/SelectDepartment.vue";
import UserListTable from "../../components/UserListTable.vue";

const userStore = useUserStore();

const searchBar = ref("");
const users = ref([]);
const selectDepartment = ref("All");
const sort = ref("student");
const sectionYear = ref("All");
const isNoData = ref(true);
const isStudent = ref(true);
const pageSize = ref("10");
const currentPage = ref(1);

const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = currentPage.value * pageSize.value;
  return users.value.slice(startIndex, endIndex);
});
const totalPages = computed(() => Math.ceil(users.value.length / pageSize.value));
const status = computed(() => {
  const entriesStart = (currentPage.value - 1) * pageSize.value + 1;
  const entriesEnd = Math.min(
    currentPage.value * pageSize.value,
    users.value.length
  );
  return `Showing ${entriesStart} to ${entriesEnd} of ${users.value.length} entries`;
});
const gotoPage = (pageNumber) => {
  currentPage.value = pageNumber;
};

const filteredUsers = computed(() => {
  if (!searchBar.value) {
    return paginatedData.value;
  }
  return paginatedData.value.filter(user =>
    user.infos.fullname.toLowerCase().includes(searchBar.value.toLowerCase()) || user.id_number.toString().includes(searchBar.value)
  );
});

const handleSelectSY = (val) => {
  sectionYear.value = val
  users.value = userStore.filterUsers(sort.value,selectDepartment.value,sectionYear.value)
};

const handleSelectRole = (val) => {
  sort.value = val;
  if (val == "student") {
    isStudent.value = true;
  } else {
    isStudent.value = false;
  }
  users.value = userStore.filterUsers(sort.value,selectDepartment.value,sectionYear.value)
  // console.log(users.value)
};

const handleSelectedDepartment = (val) => {
  selectDepartment.value= val
  users.value = userStore.filterUsers(sort.value,selectDepartment.value,sectionYear.value)
};

const handleActionClicked = (id, action) => {
  console.log(id, action);
};

onMounted(async () => {
  await userStore.fetchAllUsers();
  if (userStore.errors.length == 0) {
    users.value = userStore.users.filter(user => user.roles[0].name == "student");
    isNoData.value = false;
    isStudent.value = true;
  }
});
</script>


<style scoped>
.active{
  color:red;
}

</style>
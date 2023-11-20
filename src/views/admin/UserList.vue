<template>
  <div class="content">
    <h1 class="font-bold">User List</h1>
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
      <div class="flex gap-4">
        <div class="selectTags flex">
          <div>
            <SortTag :sort="sort" @handleSelectRole="handleSelectRole" />
          </div>
          <div>
            <SelectDepartment
              :selectDepartment="selectDepartment"
              @handleSelectedDepartment="handleSelectedDepartment"
            />
          </div>
        </div>
        <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Create User
        </button>
      </div>
    </div>
    <UserListTable
      :data="users"
      :isNoData="isNoData"
      @handleActionClick="handleActionClicked"
    ></UserListTable>
  </div>
</template>

<script setup>
import { useUserStore } from "../../stores/users";
import { ref, onMounted, computed } from "vue";
import SortTag from "../../components/SortTag.vue";
import SelectDepartment from "../../components/SelectDepartment.vue";
import UserListTable from "../../components/UserListTable.vue";

const userStore = useUserStore();

const userList = ref([]);
const searchBar = ref("");
const users = ref([]);
let selectDepartment = ref("All");
let sort = ref("student");
const isNoData = ref(true);
// const filteredUsers = computed(() => {
//   if (!searchBar.value) {
//     return users.value;
//   }
//   return users.value.filter((data) =>
//     data.name.toLowerCase().includes(searchBar.value.toLowerCase())
//   );
// });

const handleSelectRole = (val) => {
  sort.value = val;
  console.log(sort.value);
};

const handleSelectedDepartment = (val) => {
  users.value = userStore.filterUsers(val);
  userList.value = val;
};

const handleActionClicked = (id, action) => {
  console.log(id, action);
};

onMounted(async () => {
  await userStore.fetchAllUsers();
  if (userStore.errors.length == 0) {
    users.value = userStore.users.filter((user) => user.roles[0].name == "student");
    isNoData.value = false;
  }
  // console.log(users.value);
  // keys.value = Object.keys(users.value[0].info)
});
</script>

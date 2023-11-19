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
            <SelectTag
              :selectDepartment="selectDepartment"
              @handleSelectedDepartment="handleSelectedDepartment"
            />
          </div>
          <div></div>
        </div>
        <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Create User
        </button>
      </div>
    </div>
    <TableForm :data="users" :isUser="true" :isNoData="isNoData"></TableForm>
  </div>
</template>

<script setup>
import { useUserStore } from "../../stores/users";
import { ref, onMounted, computed } from "vue";
import SelectTag from "../../components/SelectTag.vue";
import TableForm from "../../components/TableForm.vue";

const userStore = useUserStore();
const userList = ref([]);
const searchBar = ref("");
const users = ref([]);
let selectDepartment = ref("All");
let role = ref("Roles");
const isNoData = ref(true);
// const filteredUsers = computed(() => {
//   if (!searchBar.value) {
//     return users.value;
//   }
//   return users.value.filter((data) =>
//     data.name.toLowerCase().includes(searchBar.value.toLowerCase())
//   );
// });

const handleSelectedDepartment = (val) => {
  users.value = userStore.filterUsers(val);
  userList.value = val;
};

onMounted(async () => {
  const test = []
  await userStore.fetchAllUsers();
  if (userStore.errors.length == 0) {
    users.value = userStore.users;
    isNoData.value = false;
    // console.log(users.value[0].infos.fullname);
  }
  // console.log(users.value);
  // keys.value = Object.keys(users.value[0].info)
});
</script>

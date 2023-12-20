<template>
  <aside class="w-0 font-Times New Roman">
    <div class="sidebar min-h-screen fixed top-0 lg:left-0 p-2 w-[250px] overflow-y-auto text-center z-40 bg-gray-100" :class="{ 'left-0': !drawer.drawerState, 'left-[-250px]': drawer.drawerState }">
      <div class="text-white-100 text-x1">
        <div class="p-2 mt-1 flex items-center justify-between">
          <img src="../assets/cpc_logo.png" height="90" width="90" class="animate-bounce hover:animate-spin"/>
          <i class="bi bi-x text-[50px] pb-20 cursor-pointer lg:hidden" @click="drawer.toggle"></i>
        </div>
        <hr class="my-2 text-black-600" />
      </div>
      <router-link v-for="(component, index) in components" :key="index" :to="component.path">
        <hr v-if="index % 3 == 0 && index != 0" class="my-2 text-gray-600" />
        <div class="router p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-black hover:text-white hover:bg-blue-500">
          <i :class="component.icon"></i>
          <span class="router-name text-[15px] ml-4">{{ component.name }}</span>
        </div>
      </router-link>
      <hr v-if="showHr && components.length % 3 == 0" class="my-2 text-gray-600" />
      <div class="router p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-black hover:text-white hover:bg-blue-500" @click="handleLogout">
        <i class="bi bi-box-arrow-right"></i>
        <span class="router-name text-[15px] ml-4">Logout</span>
      </div>
    </div>
  </aside><!-- End of aside tag -->
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useDrawerStore } from "../stores/drawerStore";
import { onMounted, ref } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const components = ref();
const toggleShow = ref(false);
const drawer = useDrawerStore();
const showHr = ref(false);
const userComponent = [
  {
    name: "Dashboard",
    icon: "bi bi-filter-circle-fill",
    path: "/",
  },
  {
    name: "Evaluatees",
    icon: "bi bi-people-fill",
    path: "/evaluatees",
  },
  {
    name: "Evaluation",
    icon: "bi bi-clipboard-data-fill",
    path: "/evaluation",
  },
  {
    name: "History",
    icon: "bi bi-arrow-counterclockwise",
    path: "/history",
  },
  {
    name: "Profile",
    icon: "bi bi-person-bounding-box",
    path: "/profile",
  },
];
const adminStaffComponent = [
  {
    name: "Dashboard",
    icon: "bi bi-filter-circle-fill",
    path: "/admin",
  },
  {
    name: "Ratings",
    icon: "bi bi-clipboard-data-fill",
    path: "/ratings",
  },
  {
    name: "Question Form",
    icon: "bi bi-gear-fill",
    path: "/question-form",
  },
  {
    name: "Evaluatees List",
    icon: "bi bi-people-fill",
    path: "/evaluatees-list",
  },
  {
    name: "Users List",
    icon: "bi bi-people-fill",
    path: "/users-list",
  },
  {
    name: "Advance Options",
    icon: "bi bi-people-fill",
    path: "/advance-options",
  },
];

const handleLogout = async () => {
  await authStore.handleLogout();
  localStorage.clear();
  router.push("/login");
};

const showToggle = () => {
  toggleShow.value = !toggleShow.value;
  console.log("toggleShow:", toggleShow.value);
};

onMounted(() => {
  showHr.value = false;
  if (authStore.isAdminStaff) {
    components.value = adminStaffComponent;
  } else {
    components.value = userComponent;
  }
  showHr.value = true;
});
</script>

<style scoped>

    .sidebar {
      /* background-color: #ffffff;
      color: #000000; */
    }

    .sidebar img {
      display: block;
      margin: auto;
    }

    /* .router i {
      color: #000000;
    } */

    /* .router .router-name {
      color: #000000;
    } */

    .router-link-active {
      font-size: x-large;
    }
    /* .router {
      @apply p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-blue-500;
    } */
    /* .router-name {
      @apply text-[15px] ml-4 text-gray-200 hover:text-white;
    } */
</style>

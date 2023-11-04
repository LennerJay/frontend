<template>
    <aside class="w-[250px]">
        <span class="absolute text-white text-4x1 top-5 left-4 cursor-pointer" >
            <i class="bi bi-filter-left px-5 p-1 bg-blue-700 rounded-md"></i>
        </span>
        <div class="sidebar fixed top-0 bottom-0 lg:left-0 left-[-250px] p-2 w-[250px] overflow-y-auto text-center bg-sky-900">
            <div class="text-gray-100 text-x1">
                <div class="p-2 mt-1 flex items-center">
                    <img src="../assets/cpc_logo.png" class="h-32 pb-2 animate-bounce hover:animate-spin">
                </div>
                <hr class="my-2 text-gray-600">
            </div>
            <router-link v-for="(component,index) in components" :key="index" :to="component.path">
                <hr v-if="index === 3" class="my-2 text-gray-600">
                <div class="router">
                    <i :class="component.icon"></i>
                    <span class="router-name">{{ component.name }}</span>
                </div>
            </router-link>
           
            <div class="router" @click="handleLogout">
                <i class="bi bi-box-arrow-right"></i>
                <span class="router-name">Logout</span>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { onMounted,ref } from "vue";

const router = useRouter()
const store = useAuthStore()
const components = ref();
const userComponent = [
    {
        name: "Dashboard",
        icon: "bi bi-filter-circle-fill",
        path: "/"
    },
    {
        name: "Evaluatees",
        icon: "bi bi-people-fill",
        path: "/evaluatees"
    },
    {
        name: "Evaluation",
        icon: "bi bi-clipboard-data-fill",
        path: "/evaluation"
    },
    {
        name: "History",
        icon: "bi bi-arrow-counterclockwise",
        path: "/history"
    },
    {
        name: "Profile",
        icon: "bi bi-person-bounding-box",
        path: "/profile"
    }

];
const adminStaffComponent = [
    {
        name: "Dashboard",
        icon: "bi bi-filter-circle-fill",
        path: "/admin"
    },
    {
        name: "Ratings",
        icon: "bi bi-clipboard-data-fill",
        path: "/ratings"
    },
    {
        name: "Question Form",
        icon: "bi bi-gear-fill",
        path: "/question-form"
    },
    {
        name: "Evaluatees List",
        icon: "bi bi-people-fill",
        path: "/evaluatees-list"
    },
    {
        name: "Users List",
        icon: "bi bi-people-fill",
        path: "/users-list"
    }
];

const handleLogout = async() =>{
    await store.handleLogout()
    router.push({ name: 'login' })


};


onMounted(() => {
    if(store.isAdminStaff){
        components.value = adminStaffComponent
    }else{
        components.value = userComponent
    }
})

</script>


<style scoped>
    .router-link-active{
        font-size: x-large;
    }
    .router{
        @apply p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-blue-600
    }
    .router-name{
        @apply text-[15px] ml-4 text-gray-200
    }
</style>
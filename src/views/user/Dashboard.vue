<template> 
        <div class="md:ml-[250px] ml-0 font-serif px-0 w-full dashboard-main-header">
            <div class="header pl-2 py-6 text-white text-center">
                <h2 class="dashboard">DASHBOARD</h2>
                <div class="font-bold p-1 text-[30px]">
                <span class="md:hidden pr-5" @click="drawer.toggle">
                    <i class="bi bi-filter-left px-5 p-1 bg-blue-900 rounded-md cursor-pointer"></i>
                </span>
                    <h1 class="header-name">Cordova Public College</h1>
                    <p class="school-year">SY: 2023-2024</p>
                </div>
                <div class="empty">
                    <!-- Nothing goes here -->
                </div>
            </div>
            <div class="card">
                    <div class="flex flex-col min-h-[43.2rem]">
                        <div id="first-container" class="first-item:flex flex-col justify-center items-center text-center border-solid border-2 h-25 m-16 p-5 bg-sky-900 text-white overflow-hidden relative">
                            <h1 class="text text-2xl font-serif">Announcement</h1>
                        </div>
                        <div id="second-container" class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5 m-10 text-white">
                            <router-link to="/" class="bg-sky-900 flex flex-col justify-center items-center text-center h-24
                            cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-900 duration-300 hover:border-sky-700 announcement">
                                <i class="bi bi-filter-circle-fill text-2xl"></i>
                                <p class="announcements">Dashboard</p>
                            </router-link>                 
                            <router-link to="/evaluatees" class="bg-sky-900 flex flex-col justify-center items-center text-center h-24
                            cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-900 duration-300 hover:border-sky-700 announcement">
                                <i class="bi bi-people-fill text-2xl"></i>
                                <p class="announcements">Evaluatees</p>
                            </router-link>
                            <router-link to="/evaluation" class="bg-sky-900 flex flex-col justify-center items-center text-center h-24
                            cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-900 duration-300 hover:border-sky-700 announcement">
                                <i class="bi bi-clipboard-data-fill text-2xl"></i>
                                <p class="announcements">Evaluation</p>
                            </router-link>
                            <router-link to="/history" class="bg-sky-900 flex flex-col justify-center items-center text-center h-24
                            cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-900 duration-300 hover:border-sky-700 announcement">
                                <i class="bi bi-arrow-counterclockwise text-2xl"></i>
                                <p class="announcements">History</p>
                            </router-link>
                            <router-link to="/profile" class="bg-sky-900 flex flex-col justify-center items-center text-center h-24
                            cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-900 duration-300 hover:border-sky-700 announcement">
                                <i class="bi bi-person-bounding-box text-2xl"></i>
                                <p class="announcements">Profile</p>
                            </router-link>  
                        </div>
                    </div>
            </div>
            <FooterCard/>
        </div>
</template>
<script setup>
import {onMounted } from 'vue';
import { useAuthStore } from "../../stores/auth";
import { useDrawerStore } from '../../stores/drawerStore';
import FooterCard from '../../components/FooterCard.vue'
const store = useAuthStore()

const drawer = useDrawerStore()


onMounted(()=>{
    console.log(store.user)
})
</script>

<style scoped>

    .dashboard-main-header {
        background-color: #0C4A6E;
        font-family: Helvetica, Georgia, "Times New Roman";
    }

    .header-name {
        font-size: 25px;
    }

    .school-year {
        font-size: 18px;
        font-style: italic
    }

    .dashboard {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
    }

    .first-container {
        border-radius: 15px;
    }

    .second-container {
        border-radius: 5px;
    }

    .announcement {
        border-radius: 5px;
    }

    .announcements {
        font-family: "Lucida Grande";
    }

</style>
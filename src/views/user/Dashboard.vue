<template>
    <div class="content bg-indigo-900 pl-1 min-h-full">
       <div class="header pl-2 pt-2 text-white text-center">
            <div class="font-bold p-1 text-[30px]">
                Cordova Public College
                <p class="text-lg">2023</p>
            </div>
            <div class="font-bold text-[20px]">DASHBOARD</div>
       </div>
       <div class="bg-stone-200">
            <div class="flex flex-col min-h-[43.2rem]">
                <div id="first-container" class="first-item:flex flex-col justify-center items-center text-center border-solid border-2 h-25 m-16 p-5 bg-sky-900 text-white overflow-hidden relative">
                    <h1 class="text-center text-5xl font-serif">Announcement</h1>
                </div>
                <div id="second-container" class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5 m-10 text-white">
                    <router-link to="/" class="bg-sky-900 flex flex-col justify-center items-center text-center h-24
                    cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-900 duration-300 hover:border-sky-700">
                        <i class="bi bi-filter-circle-fill text-2xl"></i>
                        <p>Dashboard</p>
                    </router-link>                 
                    <router-link to="/evaluatees" class="bg-sky-900 flex flex-col justify-center items-center text-center h-24
                    cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-900 duration-300 hover:border-sky-700">
                        <i class="bi bi-people-fill text-2xl"></i>
                        <p>Evaluatees</p>
                    </router-link>
                    <router-link to="/evaluation" class="bg-sky-900 flex flex-col justify-center items-center text-center h-24
                    cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-900 duration-300 hover:border-sky-700">
                        <i class="bi bi-clipboard-data-fill text-2xl"></i>
                        <p>Evaluation</p>
                    </router-link>
                    <router-link to="/history" class="bg-sky-900 flex flex-col justify-center items-center text-center h-24
                    cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-900 duration-300 hover:border-sky-700">
                        <i class="bi bi-arrow-counterclockwise text-2xl"></i>
                        <p>History</p>
                    </router-link>
                    <router-link to="/profile" class="bg-sky-900 flex flex-col justify-center items-center text-center h-24
                    cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-900 duration-300 hover:border-sky-700">
                        <i class="bi bi-person-bounding-box text-2xl"></i>
                        <p>Profile</p>
                    </router-link>  
                </div>
            </div>
       </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router";
</script>

<style scoped>
</style>
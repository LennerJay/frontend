<template>
    <aside class="w-0 z-50">
        <div class="sidebar min-h-screen fixed top-0 lg:left-0 p-2 w-[250px] overflow-y-auto text-center bg-sky-900"
      :class="{ 'left-0': !drawer.drawerState, 'left-[-250px]': drawer.drawerState }">
            <div class="text-gray-100 text-x1">
                <div class="p-2 mt-1 flex items-center justify-between">
                    <img src="../assets/cpc_logo.png" class="h-32 pb-2 animate-bounce hover:animate-spin">
                    <i class="bi bi-x text-[50px] pb-20 cursor-pointer lg:hidden" @click="drawer.toggle"></i>
                </div>
                <hr class="my-2 text-gray-600">
            </div>
            <router-link to='/'>
                <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-blue-600">
                    <i class="bi bi-filter-circle-fill"></i>
                    <span class="text-[15px] ml-4 text-gray-200">Dashboard</span>
                </div>
            </router-link>
            <router-link to="/evaluation">
                <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-blue-600" >
                    <i class="bi bi-clipboard-data-fill"></i>
                    <span class="text-[15px] ml-4 text-gray-200">Evaluation</span>
                </div>
            </router-link>
            <hr class="my-4 text-gray-600">
            <router-link to="/profile">
                <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-blue-600">
                    <i class="bi bi-gear-fill"></i>
                    <span class="text-[15px] ml-4 text-gray-200">Profile</span>
                </div>
            </router-link>
            <router-link to="/test">
                <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-blue-600">
                    <i class="bi bi-gear-fill"></i>
                    <span class="text-[15px] ml-4 text-gray-200">test</span>
                </div>
            </router-link>
            <div class="text-left text-sm font-thin mt-2 w-4/5 mx-auto text-white" id="submenu">
                <h1 class="cursor-pointer p-2 hover:bg-blue-700 rounded-md mt-1 hidden" id="profile"><i class="bi bi-person-circle pr-2"></i>Profile</h1>           
            </div>
            <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-blue-600" @click="handleLogout">
                <i class="bi bi-box-arrow-right"></i>
                <span class="text-[15px] ml-4 text-gray-200">Logout</span>
            </div>
        </div>
    </aside>
    <slot></slot>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useDrawerStore } from '../stores/drawerStore';

const drawer = useDrawerStore()
const router = useRouter()
const store = useAuthStore()

const handleLogout = async() =>{
    await store.handleLogout()
    router.push({ name: 'login' })
};
</script>


<style scoped>
    .router-link-active{
        font-size: x-large;
    }
</style>
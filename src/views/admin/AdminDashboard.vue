<template>
    <div class="md:ml-[250px] ml-0 font-poppins px-0 w-full dashboard-main-header">
        <div class="header pl-2 py-6 text-white text-center bg-sky-950">
            <h2 class="dashboard">DASHBOARD</h2>
            <div class="font-bold p-1 text-[30px] inline-block">
              <span class="md:hidden pr-5" @click="drawer.toggle">
                <i class="bi bi-filter-left px-5 p-1 bg-blue-900 rounded-md cursor-pointer"></i>
              </span>
                <h1 class="header-name">Cordova Public College</h1>
            </div>
            <div class="empty">
                <!-- Nothing goes here -->
            </div>
       </div>
       <div class="bg-stone-100">
            <div class="flex flex-col min-h-[43.2rem]">
                <h1 class="text-[20px] font-bold text-black dark:text-white m-8 ml-16 max-w-[250px] 
                text-center" id="cards">Overview Section</h1>
                <!-- CARD SECTION -->
                <div class="card-container mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-1 p-5 m-10">
                    <div class="first-card first-letter:bg-sky-900 flex flex-col justify-center items-center text-center h-32
                    cursor-pointer border-2 border-indigo-200 bg-white
                    hover:-translate-y-1 hover:scale-90" id="cards">
                        <h1 class="hover:text-indigo-500">
                            <i class="bi bi-person-fill mr-1 text-2xl"></i>
                            <p>{{ res.total_users }}</p>
                            <p>Students Enrolled</p>
                        </h1>
                    </div>
                    <div class="first-card first-letter:bg-sky-900 flex flex-col justify-center items-center text-center h-32
                    cursor-pointer border-2 border-indigo-200 bg-white
                    hover:-translate-y-1 hover:scale-90" id="cards">
                        <h1 class="hover:text-indigo-500">
                            <i class="bi bi-clipboard-data-fill mr-1 text-2xl"></i>
                            <p>{{ res.total_evaluatees }}</p>
                            <p>Evaluates Registered</p>
                        </h1>
                    </div>
                    <div class="first-card first-letter:bg-sky-900 flex flex-col justify-center items-center text-center h-32
                    cursor-pointer border-2 border-indigo-200 bg-white
                    hover:-translate-y-1 hover:scale-90" id="cards">
                        <h1 class="hover:text-indigo-500">
                            <i class="bi bi-bank2 mr-1 text-2xl"></i>
                            <p>Nan</p>
                        </h1>
                    </div>
                </div>
                <!-- GRAPH SECTION -->
                <div class="card-container mt-8 grid gap-10 lg:grid-cols-2 sm-grid-cols-1 p-5 m-10">
                    <div class="first-card first-letter:bg-sky-900 flex flex-col justify-center items-center text-center h-80
                    cursor-pointer border-2 border-indigo-200 bg-white
                    hover:-translate-y-1 hover:scale-90" id="cards">
                        <h1>FIRST GRAPH!!!</h1>
                    </div>
                    <div class="first-card first-letter:bg-sky-900 flex flex-col justify-center items-center text-center h-80
                    cursor-pointer border-2 border-indigo-200 bg-white
                    hover:-translate-y-1 hover:scale-90" id="cards">
                        <h1>SECOND GRAPH!!!</h1>
                    </div>
                </div>
                <!-- CHAIRPERSON TABLE SECTION -->
                <div class="table-container mt-8 p-5 m-8 bg-white border-2 border-indigo-200 max-w-full items-center max-h-[250px] md:max-h-[300px] overflow-y-scroll" id="cards">
                    <h1 class="block text-black font-bold font-poppins">CHAIRPERSON</h1>
                    <div class="shadow-md sm:rounded-lg mt-4">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Department
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-left">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Ranel
                                    </th>
                                    <td class="px-6 py-4">
                                        ranel.soliano@gmail.com
                                    </td>
                                    <td class="px-6 py-4">
                                        BSIT
                                    </td>
                                    <td class="px-6 py-4">
                                        Active
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            <i class="bi bi-pencil-square"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Lenner
                                    </th>
                                    <td class="px-6 py-4">
                                        lennersoliano@gmail.com
                                    </td>
                                    <td class="px-6 py-4">
                                        BSHM
                                    </td>
                                    <td class="px-6 py-4">
                                        Active
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            <i class="bi bi-pencil-square"></i>
                                        </a>
                                    </td>
                                </tr>   
                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Erik
                                    </th>
                                    <td class="px-6 py-4">
                                        erikredolosa@gmail.com
                                    </td>
                                    <td class="px-6 py-4">
                                        BEED
                                    </td>
                                    <td class="px-6 py-4">
                                        Active
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            <i class="bi bi-pencil-square"></i>
                                        </a>
                                    </td>
                                </tr>                              
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
       </div>
       <FooterCard/>
    </div>
</template>

<script setup>
import { useDashboardStore } from '../../stores/dashboard';
import { useDrawerStore } from '../../stores/drawerStore';
import { ref,onMounted } from 'vue';
import FooterCard from '../../components/FooterCard.vue'
import { useAuthStore } from "../../stores/auth";


const drawer = useDrawerStore()
const dashboardStore = useDashboardStore()
const res = ref([]);
const store = useAuthStore()

// console.log(store.isLoggedIn)
// console.log(store.isAdminStaff)


onMounted(async()=>{
    const data = await dashboardStore.fetchAdminDashboardData()
    res.value = dashboardStore.adminData
    console.log(res.value)

    
})

</script>

<style scoped>
    .dashboard-main-header {
        background-color: #0C4A6E;
    }

    .header-name {
        font-size: 25px;
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
    #cards {
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 35px 35px 68px 0px rgba(127, 147, 224, 0.2);
    transition: all 0.3s;
    }

    /* #cards:hover {
    box-shadow: 35px 35px 68px 0px rgba(157, 177, 255, 0.5);
    } */

    #cards:active {
    transform: scale(0.95);
    border: 1px solid blue;
    }
    .overflow-y-auto::-webkit-scrollbar {
    display: none;
    width: 0px;
    }
    .overflow-y-auto:hover::-webkit-scrollbar {
    display: block;
    }
    .overflow-y-auto::-webkit-scrollbar-track {
    background-color: transparent;
    }
    .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: rgb(8, 47, 73, 1);
    border-radius: 8px;
    width: 4px;
    }
</style>
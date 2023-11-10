<template>
    <div class="md:ml-[250px] ml-0 bg-violet-900 font-serif px-0 w-full">
        <div class="header pl-2 pt-2 text-white text-center">
            <div class="font-bold p-1 text-[30px]">
                <span class="inline-block md:hidden" @click="drawer.toggle">
                    <i class="bi bi-filter-left px-5 bg-blue-700 rounded-md cursor-pointer"></i>
                </span>
                <h1 class="font-bold">Student Profile</h1>
            </div>
        </div>
        <div class="bg-stone-200 h-[42.9rem]">
            <div class="px-2 py-4 mt-16 flex flex-col justify-center items-center text-center pt-16">
                <img class="inline-flex object-cover border-4 border-sky-900 dark:border-sky-700 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-sky-800/100 dark:shadow-sky-900/100 bg-sky-50 dark:bg-sky-900 text-sky-800 dark:text-sky-800 h-24 w-24 !h-48 !w-48" src="../../assets/pic2.jpg" alt="Student Profile">
                <div v-for="info in user.infos">
                    <h1 class="text-2xl text-sky-800 font-bold mt-2">{{info.fullname}}
                        <p class="text-sm text-sky-900 mt-2">ID Number: {{ user.id_number  }}</p>
                        <p class="text-sm text-sky-900 mt-2">Department: {{ user.departments[0].department }}</p>
                    </h1>
                    <h2 class="text-base md:text-xl text-sky-800 font-bold">Course: {{info.course}}</h2>
                    <ul class="flex flex-row mt-2">
                        <li class="mx-2 text-sky-900 hover:text-sky-600">
                            <a href="" target="_blank" aria-label="mobile_number">
                                <i class="fas fa-mobile-alt marker:mr-2 h-6 pr-2"></i>{{info.mobile_number}}
                            </a>
                        </li>
                        <li class="mx-2 text-sky-900 hover:text-sky-600">
                            <a href="" target="_blank" aria-label="email">
                                <i class="fas fa-envelope h-6 mr-2"></i>Email: {{info.email}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                <table class="w-full table-fixed">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="header">Year & Section</th>
                            <tr>
                                <th class="header">Subject</th>
                                <th class="header">Instructor</th>
                                <th class="header">SChedule</th>
                            </tr>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="yearSection in user.year_sections">
                            <td class="data">{{ yearSection.year_section }}</td>
                            <tr v-for="klass in yearSection.classes">
                                <td class="data"  >{{ klass.subject.name }}</td>
                                <td class="data">{{ klass.evaluatee.name }}</td>
                                <td class="data">Date</td>
                            </tr>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth';
import { useDrawerStore } from '../../stores/drawerStore';
import { storeToRefs } from 'pinia';



const drawer = useDrawerStore()
const userStore = useAuthStore();
const { user } = storeToRefs(userStore)
const user1 = userStore.user.infos;


onMounted(() => {
    console.log(user.value.year_sections);
});
</script>


<style scoped>
.header{
    @apply py-4 px-6 text-left text-gray-600 font-bold uppercase
}
.data{
    @apply py-4 px-6 border-b border-gray-200
}
</style>
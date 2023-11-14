<template>
    <div class="md:ml-[250px] ml-0 bg-sky-950 font-Times New Roman px-0 w-full">
        <div class="header pt-2 text-white text-center">
            <div class="flex justify-center items-center font-bold text-[20px] my-6">
              <!-- <span class="md:hidden pr-2" @click="drawer.toggle">
                <i class="bi bi-filter-left px-5 p-1 bg-blue-900 rounded-md cursor-pointer"></i>
              </span> -->
                <h1 class="text-2xl">Student Profile</h1>
            </div>    
        </div>
        <div class="bg-stone-200 min-h-[44rem]">
            <div class="px-2 py-4 flex flex-col justify-center items-center text-center pt-16">
                <img class="inline-flex object-cover border-4 border-sky-900 dark:border-sky-700 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-sky-800/100 dark:shadow-sky-900/100 bg-sky-50 dark:bg-sky-900 text-sky-800 dark:text-sky-800 h-24 w-24 !h-48 !w-48" src="../../assets/pic2.jpg" alt="Student Profile">
                <div v-if="showProfile">
                    <h1 class="text-2xl text-sky-800 font-bold mt-2">{{user.infos.fullname}}</h1>
                    <p class="text-sm text-sky-900 mt-2">ID Number: {{ user.id_number }}</p>
                    <h2 class="text-base md:text-xl text-sky-800 font-bold">Course: {{user.infos.course}}</h2>
                    <ul class="flex flex-row mt-2">
                        <li class="mx-2 text-sky-900 hover:text-sky-600">
                            <a href="" target="_blank" aria-label="mobile_number">
                                <i class="fas fa-mobile-alt marker:mr-2 h-6 pr-2"></i>{{user.infos.mobile_number}}
                            </a>
                        </li>
                        <li class="mx-2 text-sky-900 hover:text-sky-600">
                            <a href="" target="_blank" aria-label="email">
                                <i class="fas fa-envelope h-6 mr-2"></i>Email: {{user.infos.email}}
                            </a>
                        </li>
                    </ul>

                    
                </div>
                <div v-else>
                    Loading Data...
                </div>
            </div>
        </div>
        <FooterCard/>
    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue'
import { useAuthStore } from '../../stores/auth';
import FooterCard from '../../components/FooterCard.vue'



const userStore = useAuthStore();
const user = ref({});
const showProfile = ref(false)
// const user = userStore.user.info;
// const year = userStore.user.year_section[0].year_section;

onMounted(async() => {

     
     user.value = await userStore.fetchUserInfo()
     showProfile.value = true
     console.log(user.value)
    //  console.log(!!userStore.userInfo)
    //  if(!!userStore.userInfo){
    //     user.value = userStore.userInfo
    //     showProfile.value = true
    //  }
    
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
<template>
  <div class="md:ml-[250px] ml-0 bg-sky-900 font-poppins px-0 w-full">
    <div class="header pt-2 text-white text-center">
      <span class="md:hidden flex text-white">
        <i class=" bi bi-filter-left px-5 p-1 bg-blue-900 hover:bg-blue-600 rounded-md cursor-pointer text-[30px] ml-0" @click="drawer.toggle"></i>
      </span>
      <div class="font-bold text-[30px] my-6 text-center text-white">
        <h1>Student Profile</h1>
      </div>
    </div>
    <div class="bg-stone-200 min-h-[44rem] card overflow-x-auto">
      <div
        class="px-2 py-4 flex flex-col justify-center items-center text-center pt-16"
        id="container"
      >
        <div v-if="showProfile">
          <div class="profile-card border-2 rounded-2xl mb-2">
            <div
              class="card-container mt-8 grid gap-4 lg:grid-cols-2 sm-grid-cols-1 p-5 m-10"
            >
              <div
                class="profile-pic border-2 border-sky-950 w-[300px] rounded-2xl shadow-inner shadow-sky-950"
              >
                <img
                  class="object-cover cursor-pointer ml-[50px] mt-4 flex flex-col border-4 mb-2 border-sky-900 dark:border-sky-700 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-sky-800/100 dark:shadow-sky-900/100 bg-sky-50 dark:bg-sky-900 text-sky-800 dark:text-sky-800 h-[200px] w-[200px]"
                  src="../../assets/pic2.jpg"
                  alt="Student Profile"
                />
              </div>
              <div class="second-col">
                <h1
                  class="text-2xl text-sky-950 font-bold mt-2 border-2 border-sky-950 rounded-lg bg-white shadow-inner shadow-sky-950"
                >
                  Cordova Public College
                </h1>
                <h2 class="text-2xl text-white font-bold mt-2">
                  {{ user.infos.fullname }}
                </h2>
                <p class="text-md text-white mt-2">Student ID: {{ user.id_number }}</p>
                <h2 class="text-base md:text-xl text-white font-bold">
                  Course: {{ user.infos.course }}
                </h2>
                <h3 class="text-base md:text-xl text-white font-bold">
                  <span v-for="(ys, index) in user.year_sections" :key="index">
                    Section: {{ ys.year_section }}
                  </span>
                </h3>
                <ul class="flex flex-row mt-2 items-center justify-center">
                  <li class="mx-2 text-white hover:text-sky-600">
                    <a href="" target="_blank" aria-label="mobile_number">
                      <i class="fas fa-mobile-alt marker:mr-2 h-6 pr-2"></i
                      >{{ user.infos.mobile_number }}
                    </a>
                  </li>
                  <li class="mx-2 text-white hover:text-sky-600">
                    <a href="" target="_blank" aria-label="email">
                      <i class="fas fa-envelope h-6 mr-2"></i>Email:
                      {{ user.infos.email }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            class="max-w-full items-center flex overflow-x-auto border-2 shadow-md rounded-2xl"
          >
            <table
              class="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400 border bg-white"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-sky-950 shadow-inner shadow-sky-950 md:text-left text-center"
              >
                <tr class="text-white">
                  <th scope="col" class="py-2">Subject</th>
                  <th scope="col" class="py-2">Schedule</th>
                  <th scope="col" class="py-2">Time</th>
                  <th scope="col" class="py-2">Instructor</th>
                </tr>
              </thead>
              <tbody class="md:text-left text-center">
                <tr
                  class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border dark:border-gray-700"
                  v-for="(yearSection, index) in user.year_sections"
                  :key="index"
                >
                  <td
                    class="py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <span v-for="(classLoad, index) in yearSection.classes" :key="index">
                      {{ capitalizeFirstLetter(classLoad.subject.name) }}
                      <!-- Add a line break if there are multiple subjects -->
                      <br v-if="index < yearSection.classes.length - 1" />
                    </span>
                  </td>
                  <td class="border">
                    <span v-for="(classLoad, index) in yearSection.classes" :key="index">
                      {{ classLoad.schedule.day.toUpperCase() }}
                      <br v-if="index < yearSection.classes.length - 1" />
                    </span>
                  </td>
                  <td class="border">
                    <span v-for="(classLoad, index) in yearSection.classes" :key="index">
                      {{ classLoad.schedule.time.toUpperCase() }}
                      <br v-if="index < yearSection.classes.length - 1" />
                    </span>
                  </td>
                  <td class="border">
                    <span v-for="(classLoad, index) in yearSection.classes" :key="index">
                      {{ classLoad.evaluatee.name }}
                      <br v-if="index < yearSection.classes.length - 1" />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else class="pl-10 pr-[120px] max-h-[26rem] ml-20">
          <div class="loader3 mt-10">
            <div class="circle1">
              <span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1"
                >L</span
              >
            </div>
            <div class="circle1">
              <span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1"
                >O</span
              >
            </div>
            <div class="circle1">
              <span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1"
                >A</span
              >
            </div>
            <div class="circle1">
              <span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1"
                >D</span
              >
            </div>
            <div class="circle1">
              <span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1"
                >I</span
              >
            </div>
            <div class="circle1">
              <span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1"
                >N</span
              >
            </div>
            <div class="circle1">
              <span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1"
                >G</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterCard />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useAuthStore } from "../../stores/auth";
import FooterCard from "../../components/FooterCard.vue";
import { useDrawerStore } from "../../stores/drawerStore";

const userStore = useAuthStore();
const user = ref({});
const showProfile = ref(false);
const drawer = useDrawerStore();

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

onMounted(async () => {
   await userStore.fetchUserInfo();
   if(!userStore.errors){
    user.value = userStore.userInfo
   }
  // showProfile.value = true;
  //  console.log(!!userStore.userInfo)
  //  if(!!userStore.userInfo){
  //     user.value = userStore.userInfo
  //     showProfile.value = true
  //  }
});
</script>

<style scoped>
.header {
  @apply py-4 px-6 text-left text-gray-400 font-bold uppercase;
}
.data {
  @apply py-4 px-6 border-b border-gray-200;
}
.loader3 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle1 {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 0 10px;
  background-color: rgb(8, 47, 73, 1);
  animation: circle1 1s ease-in-out infinite;
}

.circle1:nth-child(2) {
  animation-delay: 0.2s;
}

.circle1:nth-child(3) {
  animation-delay: 0.4s;
}

.circle1:nth-child(4) {
  animation-delay: 0.6s;
}

.circle1:nth-child(5) {
  animation-delay: 0.8s;
}

@keyframes circle1 {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.profile-card {
  background: linear-gradient(145deg, rgb(239, 239, 252), rgb(8, 47, 73, 1));
}
</style>

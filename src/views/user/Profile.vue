<template>
  <div class="flex">
    <div class="md:ml-[250px] ml-0 bg-sky-900 font-poppins px-0 w-full">
      <div class="header pt-2 text-white text-center">
        <span class="md:hidden flex text-white">
          <i
            class="bi bi-filter-left px-5 p-1 rounded-md cursor-pointer text-[30px]"
            @click="drawer.toggle"
          ></i>
        </span>
        <div class="font-bold text-[30px] md:my-6 text-center text-white">
          <h1>Student Profile</h1>
        </div>
      </div>
      <div class="bg-stone-200 min-h-[44rem] card overflow-x-auto">
        <div
          class="flex flex-col justify-center items-center text-center pt-16"
          id="container"
        >
          <div v-if="showProfile">
            <div v-if="isNodata" class="py-20">
              <h2 class="capitalize text-lg">Please update you profile</h2>
              <div class="mt-4">
                <button
                  class="rounded bg-sky-900 text-white w-24 h-10 py-2 hover:bg-sky-700"
                  @click="showEditProfile = true"
                >
                  Click Here!
                </button>
              </div>
            </div>
            <div v-else>
              <div class="profile-card mb-2">
                <div
                  class="card-container mt-8 grid gap-4 lg:grid-cols-2 sm-grid-cols-1 p-5 m-10"
                >
                  <div class="flex items-center justify-center">
                    <div
                      class="profile-pic border-2 border-sky-950 w-[300px] rounded-full card shadow-inner shadow-sky-950"
                    >
                      <img
                        class="object-cover cursor-pointer mt-4 flex flex-col mx-auto border-4 mb-2 border-sky-900 dark:border-sky-700 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-sky-800/100 dark:shadow-sky-900/100 bg-sky-50 dark:bg-sky-900 text-sky-800 dark:text-sky-800 h-[200px] w-[200px]"
                        src="../../assets/pic2.jpg"
                        alt="Student Profile"
                      />
                    </div>
                  </div>
                  <div class="second-col">
                    <h1
                      class="text-2xl text-sky-950 font-bold mt-2 border-2 border-sky-950 rounded-lg bg-white shadow-inner shadow-sky-950"
                    >
                      Cordova Public College
                    </h1>
                    <h2 class="text-2xl text-white font-bold mt-2">
                      {{ user.fullname }}
                    </h2>
                    <h2 class="text-lg text-white mt-2">
                      Student ID: {{ user.id_number }}
                    </h2>
                    <h2 class="text-base md:text-xl text-white font-bold">
                      Course: {{ user.course }}
                    </h2>
                    <h3 class="text-base md:text-xl text-white font-bold">
                      <!-- <span>{{
                        isRegular(user.section_years) ? "Regular" : "Irregular"
                      }}</span> -->
                    </h3>
                    <ul
                      class="flex flex-row mt-2 items-center justify-center border-b border-white"
                    >
                      <li class="mx-2 text-white hover:text-sky-300 font-medium">
                        <a href="" target="_blank" aria-label="mobile_number">
                          <i class="fas fa-mobile-alt marker:mr-2 h-6 pr-2"></i
                          >{{ user.mobile_number }}
                        </a>
                      </li>
                      <li class="mx-2 text-white hover:text-sky-300 font-medium">
                        <a href="" target="_blank" aria-label="email">
                          <i class="fas fa-envelope h-6 mr-2"></i>Email:
                          {{ user.email }}
                        </a>
                      </li>
                    </ul>
                    <div class="mt-4">
                      <button
                        class="rounded bg-sky-900 text-white w-40 h-10 hover:bg-sky-700"
                        @click="modalStore.showResetPasswordModal"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="max-w-full items-center flex flex-col overflow-xy-scroll shadow-md mb-10"
              >
                <table
                  v-for="(userClass, classIndex) in userClasses"
                  :key="classIndex"
                  class="w-full h-24 my-2 text-md text-left rtl:text-right text-black dark:text-gray-400 border bg-white"
                >
                  <caption
                    class="text-[25px] text-white uppercase bg-sky-950 shadow-inner shadow-sky-950 text-center"
                  >
                    {{
                      userClass.department
                    }}
                  </caption>
                  <thead
                    class="text-md text-gray-700 uppercase bg-sky-950 shadow-inner shadow-sky-950 md:text-left text-center"
                  >
                    <tr class="text-white text-center">
                      <th scope="col" class="py-2 border-r border-white">
                        Year & Section
                      </th>
                      <th scope="col" class="py-2 border-r border-white">Subject</th>
                      <th scope="col" class="py-2 border-r border-white">Schedule</th>
                      <th scope="col" class="py-2 border-r border-white">Time</th>
                      <th scope="col" class="py-2">Instructor</th>
                    </tr>
                  </thead>
                  <tbody
                    class="md:text-left text-center"
                    v-for="(klasses, klassIndex) in userClass.classes"
                    :key="klassIndex"
                  >
                    <tr
                      class="odd:bg-white border-b text-center border-gray-400 odd:dark:bg-gray-900 even:bg-gray-200 even:dark:bg-gray-800 border dark:border-gray-700"
                      v-for="(klass, klassIndex) in klasses"
                      :key="klassIndex"
                    >
                      <td
                        class="td border-r border-gray-400 uppercase"
                        v-if="klassIndex === 0"
                        :rowspan="klasses.length"
                      >
                        {{ klass.section_year }}
                      </td>
                      <td class="td border-r border-gray-400 capitalize">
                        {{ klass.subject }}
                      </td>
                      <td class="td border-r border-gray-400 uppercase">
                        {{ klass.day }}
                      </td>
                      <td class="td border-r border-gray-400 uppercase">
                        {{ klass.time }}
                      </td>
                      <td class="td border-r border-gray-400 capitalize">
                        {{ klass.evaluatee_name }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div v-else class="pl-10 pr-[120px] max-h-[26rem] ml-20">
            <LoadingAnimation />
          </div>
        </div>
      </div>
      <transition name="fade">
        <EditProfileModal v-if="showEditProfile" @closeBtn="handleCloseProfileBtn" />
      </transition>
     
      <transition name="fade">
        <ResetPasswordModal />
      </transition>
      <FooterCard />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useAuthStore } from "../../stores/auth";
import FooterCard from "../../components/FooterCard.vue";
import { useDrawerStore } from "../../stores/drawerStore";
import { useEvaluateeStore } from "../../stores/evaluatee";
import LoadingAnimation from "../../components/LoadingAnimation.vue";
import EditProfileModal from "../../components/EditProfileModal.vue";
import { userModalStore } from "../../stores/modalStore";
import ResetPasswordModal from "../../components/ResetPasswordModal.vue";

const showEditProfile = ref(false);

const evaluateeStore = useEvaluateeStore();
const modalStore = userModalStore();
const drawer = useDrawerStore();
const userStore = useAuthStore();
const user = ref({});
const showProfile = ref(false);
const userClasses = ref([]);
const isNodata = ref(true);

const handleCloseProfileBtn = () => {
  showEditProfile.value = false;
};

const isRegular = (sectionYears) => {
  return sectionYears.length == 1 ? true : false;
};
onMounted(async () => {
  showProfile.value = false;
  if (userStore.userInfo.length == 0) {
    await userStore.fetchUserInfo();
  }
  showProfile.value = true;
  if (userStore.isSuccess) {
    user.value = userStore.userInfo;
    userClasses.value = userStore.filterSchedule();
    isNodata.value = false;
  } else {
    isNodata.value = true;
  }
  showProfile.value = true;
});
</script>

<style scoped>
.td {
  @apply py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white;
}
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

<template>
  <div class="md:ml-[250px] ml-0 font-poppins px-0 w-full text-center">
    <div class="header pl-2 md:pt-2 bg-sky-900 text-white text-center">
      <span class="md:hidden flex pt-2">
        <i
          class="bi bi-filter-left px-5 p-1 bg-blue-900 hover:bg-blue-600 rounded-md cursor-pointer text-[30px] ml-2"
          @click="drawer.toggle"
        ></i>
      </span>
      <div class="font-bold p-1 text-[20px]">
        <h2>History</h2>
        <h3>Cordova Public College</h3>
        <span class="school-year">SY: 2023-2024</span>
      </div>
      <div class="empty pb-2"></div>
    </div>
    <div class="bg-stone-200 min-h-[44rem] card overflow-x-auto">
      <div v-if="showProfileCard">
        <div class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5">
          <ProfileCard
            v-for="(evaluatee, index) in evaluatees"
            :evaluatee="evaluatee"
            :key="index"
            @selectedEvaluatee="selectedEvaluatee"
          />
        </div>
      </div>
      <div v-else class="pl-10 pr-[120px] max-h-[26rem] ml-20 pt-20">
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
      <div v-if="isNoData">
        <h1>You have not rated yet</h1>
      </div>
    </div>
    <FooterCard />
  </div>
</template>

<script setup>
import ProfileCard from "../../components/ProfileCard.vue";
import { ref, onMounted } from "vue";
import { useEvaluateeStore } from "../../stores/evaluatee";
import { useDrawerStore } from "../../stores/drawerStore";
import FooterCard from "../../components/FooterCard.vue";

const evaluatees = ref([]);
const drawer = useDrawerStore();
const evaluateeStore = useEvaluateeStore();
const showProfileCard = ref(false);
const isNoData = ref(false);

const selectedEvaluatee = () => {
  console.log("test");
};

onMounted(async () => {
  if (evaluateeStore.evaluateesToRate.length == 0) {
    await evaluateeStore.fetchEvaluateesToRate();
  }
  evaluatees.value = evaluateeStore.isRatedEvaluatees(true);
  if (evaluatees.value.length > 0) {
    showProfileCard.value = true;
    isNoData.value = false;
  } else {
    showProfileCard.value = true;
    isNoData.value = true;
  }
});
</script>
<style scoped></style>

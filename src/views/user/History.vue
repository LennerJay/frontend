<template>
  <div class="flex">
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
      <div v-if="showProfileCards">
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
        <LoadingAnimation />
      </div>
      <div v-if="isNoData">
        <h1>You have not rated yet</h1>
      </div>
    </div>
    <div v-if="showSummary">
      <SummaryModal
        @close-modal="closeSummaryBtn"
        :showDetail="showDetail"
        :noData="isNoSummary"
        :questionaire="questionaire"
        :evaluateeName="evaluateeName"
        :ratingSummary="ratingSummary"
      />
    </div>
    <FooterCard />
  </div>
  
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useEvaluateeStore } from "../../stores/evaluatee";
import { useDrawerStore } from "../../stores/drawerStore";
import { useRatingStore } from "../../stores/rating";
import FooterCard from "../../components/FooterCard.vue";
import ProfileCard from "../../components/ProfileCard.vue";
import LoadingAnimation from "../../components/LoadingAnimation.vue";
import SummaryModal from "../../components/SummaryModal.vue";

const evaluateeStore = useEvaluateeStore();
const drawer = useDrawerStore();
const ratingStore = useRatingStore();
const evaluatees = ref([]);
const ratingSummary = ref([]);
const showProfileCards = ref(false);
const isNoData = ref(false);
const showDetail = ref(false);
const showSummary = ref(false);
const isNoSummary = ref(false);
const evaluateeName = ref("");
const questionaire = ref([]);

const selectedEvaluatee = async (evaluatee_id, evaluatee_name) => {
  showSummary.value = true;
  evaluateeName.value = evaluatee_name;
  showDetail.value = false;
  await ratingStore.getRatingSummary(evaluatee_id);
  if (ratingStore.summary.length != 0) {
    questionaire.value = ratingStore.summary.questionaire;
    const res = groupByCriteria(
      ratingStore.summary.ratingSummary,
      (summary) => summary.criteria
    );
    for (const summary in res) {
      ratingSummary.value.push({
        criteria: summary,
        summary: res[summary],
      });
    }
    showDetail.value = true;
  } else {
    isNoSummary.value = true;
  }
};

const groupByCriteria = (values, keySelector) => {
  return values.reduce(function (accumulator, current) {
    const key = keySelector(current);
    (accumulator[key] = accumulator[key] || []).push(current);
    return accumulator;
  }, {});
};

const closeSummaryBtn = () => {
  showSummary.value = false;
  showDetail.value = false;
  isNoSummary.value = false;
};

onMounted(async () => {
  if (evaluateeStore.evaluateesToRate.length == 0) {
    await evaluateeStore.fetchEvaluateesToRate();
  }
  evaluatees.value = evaluateeStore.isRatedEvaluatees(true);
  if (evaluatees.value.length > 0) {
    showProfileCards.value = true;
    isNoData.value = false;
  } else {
    showProfileCards.value = true;
    isNoData.value = true;
  }
});
</script>
<style scoped></style>

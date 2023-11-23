<template>
  <div class="content">
    <div>Question Form</div>
    <QuestionaireTable :isNoData="isNoData" :data="questionaires" @handleAction="selectQuestionaire"/>
    <QuestionaireDetail v-if="showDetails" :selectedQuestionaire="selectedQuestionaire" @backButton="handleBack"/>
  </div>
</template>

<script setup>
import { useQuestionaireStore } from "../../stores/questionaire";
import { ref, onMounted } from "vue";
import QuestionaireTable from "../../components/QuestionaireTable.vue";
import QuestionaireDetail from "../../components/QuestionaireDetail.vue";

const questionaireStore = useQuestionaireStore();

const questionaires = ref([]);
const showDetails = ref(false);
const selectedQuestionaire = ref();
const isNoData = ref(false);


const selectQuestionaire = (id,action) => {
  if(action == 'details'){
      selectedQuestionaire.value = questionaires.value.find(questionaire => questionaire.id === id);
      console.log(selectedQuestionaire.value);
      localStorage.setItem("selectedQuestionaire", JSON.stringify(selectedQuestionaire.value));
      showDetails.value = true;
  }else if(action == 'questions'){

  }

};

const handleBack = () => {
  localStorage.removeItem("selectedQuestionaire");
  showDetails.value = false;
};

onMounted(async () => {
  await questionaireStore.fetchQuestionaire();
  questionaires.value = questionaireStore.questionaires;
  console.log(questionaires.value)
  if (localStorage.getItem("selectedQuestionaire")) {
    selectedQuestionaire.value = JSON.parse(localStorage.getItem("selectedQuestionaire"));
    showDetails.value = true;
  }
});
</script>

<style lang="scss" scoped>



</style>

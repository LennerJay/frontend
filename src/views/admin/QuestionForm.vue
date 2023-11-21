<template>
  <div class="content">
    <div>Question Form</div>
    <QuestionaireTable :isNoData="isNoData" :data="questionaires"></QuestionaireTable>
  </div>
</template>

<script setup>
import { useQuestionaireStore } from "../../stores/questionaire";
import { ref, onMounted } from "vue";
import QuestionaireTable from "../../components/QuestionaireTable.vue";

const questionaireStore = useQuestionaireStore();

const questionaires = ref([]);
const showTable = ref(false);
const selectedQuestionaire = ref();
const isNoData = ref(false);


const selectQuestionaire = (id) => {
  selectedQuestionaire.value = questionaires.value.find(
    (questionaire) => questionaire.id === id
  );
  console.log(selectedQuestionaire.value);
  localStorage.setItem("selectedQuestionaire", JSON.stringify(selectedQuestionaire.value));
  showTable.value = true;
};

const handleBack = () => {
  localStorage.removeItem("selectedQuestionaire");
  showTable.value = false;
};

onMounted(async () => {
  await questionaireStore.fetchQuestionaire();
  questionaires.value = questionaireStore.questionaires;
  console.log(questionaires.value)
  if (localStorage.getItem("selectedQuestionaire")) {
    selectedQuestionaire.value = JSON.parse(localStorage.getItem("selectedQuestionaire"));
    showTable.value = true;
  }
});
</script>

<style lang="scss" scoped></style>

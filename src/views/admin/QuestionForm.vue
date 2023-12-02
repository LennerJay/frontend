<template>
  <div class="main-container w-screen">
    <div class="content">
      <div class="navbar-container">
        <div class="navbar-content">
          <header id="main-header">
            <h1>Question Form</h1>
            <h2>Cordova Public College</h2>
          </header>
        </div>
      </div>
      <!-- End of navbar-container -->
      <QuestionaireTable
        :isNoData="isNoData"
        :data="questionaires"
        @handleAction="selectQuestionaire"
      />
      <QuestionaireDetail
        v-if="showDetails"
        :selectedQuestionaire="selectedQuestionaire"
        @backButton="handleBack"
      />

      <FooterCard />
    </div>
    <!-- End of content -->
  </div>
  <!-- End of mainn-container -->
</template>

<script setup>
import { useQuestionaireStore } from "../../stores/questionaire";
import { ref, onMounted } from "vue";
import QuestionaireTable from "../../components/QuestionaireTable.vue";
import QuestionaireDetail from "../../components/QuestionaireDetail.vue";
import FooterCard from "../../components/FooterCard.vue";

const questionaireStore = useQuestionaireStore();

const questionaires = ref([]);
const showDetails = ref(false);
const selectedQuestionaire = ref();
const isNoData = ref(false);

const selectQuestionaire = (id, action) => {
  if (action == "details") {
    selectedQuestionaire.value = questionaires.value.find(
      (questionaire) => questionaire.id === id
    );
    console.log(selectedQuestionaire.value);
    localStorage.setItem(
      "selectedQuestionaire",
      JSON.stringify(selectedQuestionaire.value)
    );
    showDetails.value = true;
  } else if (action == "questions") {
  }
};

const handleBack = () => {
  localStorage.removeItem("selectedQuestionaire");
  showDetails.value = false;
};

onMounted(async () => {
  await questionaireStore.fetchQuestionaire();
  questionaires.value = questionaireStore.questionaires;
  console.log(questionaires.value);
  if (localStorage.getItem("selectedQuestionaire")) {
    selectedQuestionaire.value = JSON.parse(localStorage.getItem("selectedQuestionaire"));
    showDetails.value = true;
  }
});
</script>

<style scoped>
.navbar-container {
  background-color: #0c4a6e;
}

.navbar-container .navbar-content {
  font-family: Helvetica, Georgia, "Times New Roman";
  padding: 15px 15px;
}

.navbar-content #main-header {
}

#main-header h1,
#main-header h2 {
  text-align: center;
}

#main-header h1 {
  color: #ffffff;
  font-size: 25px;
  font-family: Verdana;
  font-weight: bold;
  margin-bottom: 8px;
}

#main-header h2 {
  color: #ffffff;
  font-size: 20px;
  font-family: Verdana;
}
</style>

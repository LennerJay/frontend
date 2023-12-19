<template>
  <div class="flex relative">
    <div class="md:ml-[250px] ml-0 font-poppins px-0 dashboard-main-header w-full">
      <div class="navbar-container">
        <div class="navbar-content">
          <header id="main-header">
            <i
              class="bi bi-filter-left px-5 p-1 text-white rounded-md cursor-pointer text-[30px] ml-2 md:hidden block"
              @click="drawer.toggle"
            ></i>
            <h1>Question Form</h1>
            <h2>Cordova Public College</h2>
          </header>
        </div>
      </div>
      <!-- End of navbar-container -->
      <div class="mt-5 flex justify-end">
        <button id="add-btn">Add Questinaire</button>
      </div>
      <div>
        <SelectEntity
          :entities="entities"
          :entity="entity"
          @handleSelect="handleSelectEntity"
        />
      </div>
      <QuestionaireTable 
        :isNoData="isNoData"
        :data="questionaires"
        :showLoadingDataAnimation="showLoadingDataAnimation"
        @handleAction="selectQuestionaire"
        class="w-full overflow-x-scroll"
      />
      <transition name="fade">
        <QuestionaireDetail
        v-if="showDetails"
        :selectedQuestionaire="selectedQuestionaire"
        @backButton="handleBack"
      />
      </transition>
      <transition name="fade">
        <WarningModal v-if="showWarningModal" 
        @CancelDelete="showWarningModal=false"
        @ClickDelete = "deleteQuestionaire"
        />
      </transition>
      <FooterCard />
    </div>
    <!-- End of content -->
  </div>
  <!-- End of mainn-container -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useEntityStore } from "../../stores/entity"
import { useDrawerStore } from '../../stores/drawerStore';
import { useQuestionaireStore } from "../../stores/questionaire";
import QuestionaireTable from "../../components/QuestionaireTable.vue";
import QuestionaireDetail from "../../components/QuestionaireDetail.vue";
import SelectEntity from "../../components/SelectEntity.vue";
import FooterCard from "../../components/FooterCard.vue";
import WarningModal from "../../components/WarningModal.vue";

const showWarningModal = ref(false)
const questionaireStore = useQuestionaireStore();
const entityStore = useEntityStore();
const drawer = useDrawerStore()
const isNoData = ref(false);
const showLoadingDataAnimation = ref(false);
const questionaires = ref([]);
const showDetails = ref(false);
const selectedQuestionaire = ref();
const entities = ref([]);
const entity = ref("All");
const qId = ref(0);
const handleSelectEntity =(val)=>{
  questionaires.value = questionaireStore.filterQuestionaires(val)
}
const selectQuestionaire = (id, action) => {
  if (action == "details") {
    selectedQuestionaire.value = questionaires.value.find(
      (questionaire) => questionaire.id === id
    );
    showDetails.value = true;
  } 
  if (action == "delete") {
    showWarningModal.value = true
    qId.value = id
  }
};

const deleteQuestionaire = async()=>{
  await questionaireStore.removeQuestionaire(qId.value)
}

const handleBack = () => {
  localStorage.removeItem("selectedQuestionaire");
  showDetails.value = false;
};

onMounted(async () => {
  showLoadingDataAnimation.value = true;
  if (!localStorage.getItem("entities")) {
    await entityStore.fetchAllEntity();
  }
  entities.value = entityStore.entities;

  await questionaireStore.fetchQuestionaire();
  showLoadingDataAnimation.value = false;
  questionaires.value = questionaireStore.questionaires;
  console.log(questionaires.value);
  if (localStorage.getItem("selectedQuestionaire")) {
    selectedQuestionaire.value = JSON.parse(localStorage.getItem("selectedQuestionaire"));
    showDetails.value = true;
  }
  
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.navbar-container {
  background-color: #0c4a6e;
}

.navbar-container .navbar-content {
  font-family: Helvetica, Georgia, "Times New Roman";
  padding: 15px 15px;
}

/* .navbar-content #main-header {
} */

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
#add-btn {
    outline: none;
    padding: 6px 12px;
    background-color: #0C4A6E;
    color: #ffffff;
  }
  #add-btn:hover {
    background-color: #1885F2;
    color: #ffffff;
    cursor: pointer;
  }

</style>

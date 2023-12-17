<template>
  <div class="flex ">
    <div class="content main-container w-screen relative">
      <div class="navbar-container">
        <div class="navbar-content">
          <header id="main-header">
            <h1>Question Form</h1>
            <h2>Cordova Public College</h2>
          </header>
        </div>
      </div>
      <!-- End of navbar-container -->
      <div class="mt-5 flex justify-end">
        <button @click="showAddQuestionaire = true" id="add-btn">Add Questinaire</button>
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
      />
      <transition name="fade">
        <QuestionaireDetail
        v-if="showDetails"
        :entities ="entities"
        :selectedQuestionaire="selectedQuestionaire"
        @backButton="closeQuestionaireDetail"
        />
      </transition>
      <transition name="fade">
        <DeleteQuestionaireModalVue
          v-if="showDeleteModal"
          :questionaireDetails ="selectedQuestionaire"
          @closeDeleteModal="closeDeleteModal"
        />
      </transition>
      <transition name="fade">
        <AddQuestionaireModal
          v-if="showAddQuestionaire"
          :entities="entities"
          @close="closeAddModal"
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
import { useQuestionaireStore } from "../../stores/questionaire";
import QuestionaireTable from "../../components/QuestionaireTable.vue";
import QuestionaireDetail from "../../components/QuestionaireDetail.vue";
import SelectEntity from "../../components/SelectEntity.vue";
import FooterCard from "../../components/FooterCard.vue";
import AddQuestionaireModal from "../../components/AddQuestionaireModal.vue";
import DeleteQuestionaireModalVue from "../../components/DeleteQuestionaireModal.vue";


const showDeleteModal= ref(false);
const questionaireStore = useQuestionaireStore();
const entityStore = useEntityStore();
const isNoData = ref(false);
const showLoadingDataAnimation = ref(false);
const showAddQuestionaire = ref(false)
const questionaires = ref([]);
const showDetails = ref(false);
const selectedQuestionaire = ref();
const entities = ref([]);
const entity = ref("All");

const closeQuestionaireDetail = ()=>{
  questionaires.value = questionaireStore.filterQuestionaires(entity.value)
  showDetails.value = false
}

const closeAddModal = ()=>{
  questionaires.value = questionaireStore.filterQuestionaires(entity.value)
  showAddQuestionaire.value = false

}

const closeDeleteModal = ()=>{
  questionaires.value = questionaireStore.filterQuestionaires(entity.value)
  showDeleteModal.value = false
}
const handleSelectEntity =(val)=>{
  entity.value = val
  questionaires.value = questionaireStore.filterQuestionaires(val)
}
const selectQuestionaire = (id, action) => {
  selectedQuestionaire.value = questionaires.value.find(
      (questionaire) => questionaire.id === id
    );
  if (action == "details") {
    showDetails.value = true;
  } 
  if (action == "delete") {
    showDeleteModal.value = true
    console.log( selectedQuestionaire.value)
  }
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

<template>
  <div class="flex">
    <div class="md:ml-[250px] ml-0 font-poppins px-0 dashboard-main-header w-full">
      <div class="navbar-container">
        <div class="navbar-content">
          <header id="main-header">
            <span class="md:hidden flex">
              <i
                class="bi bi-filter-left px-5 p-1 rounded-md cursor-pointer text-white text-[30px]"
                @click="drawer.toggle"
              ></i>
            </span>
            <h1>Question Form</h1>
            <p>Cordova Public College</p>
          </header>
        </div>
      </div>
      <!-- End of navbar-container -->
      <div class="mt-5 flex justify-end gap-7">
        <button @click="showDisplay('questionaires')" id="add-btn">
          Show Questinaire
        </button>
        <button @click="showDisplay('criterias')" id="add-btn">Show Criterias</button>
      </div>
      <transition-group name="fade">
        <div key="selectTag" class="flex gap-6 items-center" v-if="showQuestionaires">
          <SelectEntity
            :entities="entities"
            :entity="entity"
            @handleSelect="handleSelectEntity"
          />
          <button @click="showAddQuestionaire = true" id="add-btn">
            Add Questinaire
          </button>
        </div>
        <QuestionaireTable
          key="questionaire"
          v-if="showQuestionaires"
          :isNoData="isNoData"
          :datas="questionaires"
          :showLoadingDataAnimation="showLoadingDataAnimation"
          @handleAction="selectQuestionaire"
          class="w-full overflow-x-scroll"
        />
        <CriteriaCards v-if="showCriterias" />
      </transition-group>

      <transition name="fade">
        <QuestionaireDetail
          v-if="showDetails"
          :entities="entities"
          :qIndex="qIndex"
          :selectedQuestionaire="selectedQuestionaire"
          @backButton="closeQuestionaireDetail"
        />
      </transition>
      <transition name="fade">
        <DeleteQuestionaireModalVue
          v-if="showDeleteModal"
          :questionaireDetails="selectedQuestionaire"
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
      <transition name="fade">
        <QuestionsModal
          v-if="showQuestionsModal"
          :questionaireInfo="selectedQuestionaire"
          :showData="showQuestionsData"
          :criterias="criterias"
          :noData="noData"
          :showActionSpinner="showActionSpinner"
          :showActionModal="showActionModal"
          @removeCriteria="removeCriteria"
          @close="closeQuestionsModal"
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
import { useEntityStore } from "../../stores/entity";
import { useDrawerStore } from "../../stores/drawerStore";
import { useQuestionaireStore } from "../../stores/questionaire";
import QuestionaireTable from "../../components/QuestionaireTable.vue";
import QuestionaireDetail from "../../components/QuestionaireDetail.vue";
import SelectEntity from "../../components/SelectEntity.vue";
import FooterCard from "../../components/FooterCard.vue";
import AddQuestionaireModal from "../../components/AddQuestionaireModal.vue";
import DeleteQuestionaireModalVue from "../../components/DeleteQuestionaireModal.vue";
import QuestionsModal from "../../components/QuestionsModal.vue";
import CriteriaCards from "../../components/CriteriaCards.vue";

const drawer = useDrawerStore();
const questionaireStore = useQuestionaireStore();
const entityStore = useEntityStore();
const showActionSpinner=ref(false)
const showActionModal=ref(false)
const showQuestionsData = ref(false);
const showQuestionsModal = ref(false);
const showDeleteModal = ref(false);
const isNoData = ref(false);
const showLoadingDataAnimation = ref(false);
const showAddQuestionaire = ref(false);
const questionaires = ref([]);
const showDetails = ref(false);
const selectedQuestionaire = ref();
const criterias = ref([]);
const entities = ref([]);
const entity = ref("All");
const qIndex = ref(false); // questionaire Index to know which is being used
const noData = ref(false);
const showQuestionaires = ref(false);
const showCriterias = ref(false);


const removeCriteria = async(id)=>{
  showActionSpinner.value = true
  await questionaireStore.detachCriteria(selectedQuestionaire.value.id,id)
  showActionSpinner.value = false
  if(questionaireStore.isSuccess){
    showActionModal.value = true
    setTimeout(()=>{
      showActionModal.value = false
      showQuestionsModal.value = false
    },1500)
  }else{
    alert("Something went wrong")
  }
}

const showDisplay = async (val) => {
  if (val == "questionaires") {
    showQuestionaires.value = true;
    showCriterias.value = false;
    if (questionaireStore.questionaires == 0) {
      showLoadingDataAnimation.value = true;
      await questionaireStore.fetchQuestionaire();
      showLoadingDataAnimation.value = false;
      if (!questionaireStore.isSuccess) {
        isNoData.value = true;
      } else {
        questionaires.value = questionaireStore.groupbByEntity();
        isNoData.value = false;
      }
    }
  } else {
    showQuestionaires.value = false;
    showCriterias.value = true;
  }
  localStorage.setItem("currentShow", val);
};

const closeQuestionsModal = () => {
  showQuestionsModal.value = false;
};

const closeQuestionaireDetail = () => {
  questionaires.value = questionaireStore.filterQuestionaires(entity.value);
  showDetails.value = false;
};

const closeAddModal = () => {
  questionaires.value = questionaireStore.filterQuestionaires(entity.value);
  showAddQuestionaire.value = false;
};

const closeDeleteModal = () => {
  questionaires.value = questionaireStore.filterQuestionaires(entity.value);
  showDeleteModal.value = false;
};

const handleSelectEntity = (val) => {
  entity.value = val;
  questionaires.value = questionaireStore.filterQuestionaires(val);
};

const selectQuestionaire = async (id, action, index) => {
  qIndex.value = index;
  selectedQuestionaire.value = questionaireStore.questionaires.find(
    (questionaire) => questionaire.id === id
  );
  if (action == "details") {
    showDetails.value = true;
  }
  if (action == "delete") {
    showDeleteModal.value = true;
    z;
  }
  if (action == "questions") {
    showQuestionsData.value = false;
    console.log(id);
    showQuestionsModal.value = true;
    await questionaireStore.fetchQuestionaireWithCriterias(id);
    if (questionaireStore.isSuccess) {
      criterias.value = questionaireStore.criteriasWithQuestions;
      if (criterias.value) {
        noData.value = false;
        showQuestionsData.value = true;
      } else {
        showQuestionsData.value = false;
        noData.value = true;
      }
    } else {
      showQuestionsData.value = false;
    }
  }
};

onMounted(async () => {
  if (!localStorage.getItem("entities")) {
    await entityStore.fetchAllEntity();
  }
  entities.value = entityStore.entities;
  if (localStorage.getItem("currentShow")) {
    showDisplay(localStorage.getItem("currentShow"))
  }
  showLoadingDataAnimation.value = true;
    await questionaireStore.fetchQuestionaire();
    showLoadingDataAnimation.value = false;
    if (!questionaireStore.isSuccess) {
      isNoData.value = true;
    } else {
      questionaires.value = questionaireStore.groupbByEntity();
      isNoData.value = false;
    }
});
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-left-enter {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter {
  transform: translateX(-100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

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
  color: #ffffff;
}

.navbar-container .navbar-content {
  font-family: Helvetica, Georgia, "Times New Roman";
  padding: 15px 15px;
}

/* .navbar-content #main-header {
} */

#main-header h1,
#main-header p {
  text-align: center;
}

#main-header h1 {
  font-size: 22px;
  font-family: Verdana;
  font-weight: bold;
}

#main-header p {
  font-size: 14px;
  font-family: Helvetica, Georgia, "Times New Roman";
}

#add-btn {
  outline: none;
  padding: 6px 12px;
  background-color: #0c4a6e;
  color: #ffffff;
}
#add-btn:hover {
  background-color: #1885f2;
  color: #ffffff;
  cursor: pointer;
}
</style>

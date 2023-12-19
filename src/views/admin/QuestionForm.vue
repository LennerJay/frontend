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
        :datas="questionaires"
        :showLoadingDataAnimation="showLoadingDataAnimation"
        @handleAction="selectQuestionaire"
        class="w-full overflow-x-scroll"
      />
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
import { useDrawerStore } from '../../stores/drawerStore';
import { useQuestionaireStore } from "../../stores/questionaire";
import QuestionaireTable from "../../components/QuestionaireTable.vue";
import QuestionaireDetail from "../../components/QuestionaireDetail.vue";
import SelectEntity from "../../components/SelectEntity.vue";
import FooterCard from "../../components/FooterCard.vue";
import AddQuestionaireModal from "../../components/AddQuestionaireModal.vue";
import DeleteQuestionaireModalVue from "../../components/DeleteQuestionaireModal.vue";
import QuestionsModal from "../../components/QuestionsModal.vue";

const showQuestionsData= ref(false)
const showQuestionsModal = ref(false)
const drawer = useDrawerStore();
const showDeleteModal = ref(false);
const questionaireStore = useQuestionaireStore();
const entityStore = useEntityStore();
const isNoData = ref(false);
const showLoadingDataAnimation = ref(false);
const showAddQuestionaire = ref(false);
const questionaires = ref([]);
const showDetails = ref(false);
const selectedQuestionaire = ref();
const entities = ref([]);
const entity = ref("All");
const qIndex = ref(false); // questionaire Index to know which is being used

const closeQuestionsModal = ()=>{
  showQuestionsModal.value = false
}

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

const selectQuestionaire = (id, action,index) => {
  qIndex.value = index;
  selectedQuestionaire.value = questionaireStore.questionaires.find(
    (questionaire) => questionaire.id === id
  );
  if (action == "details") {
    showDetails.value = true;
  }
  if (action == "delete") {
    showDeleteModal.value = true;
  }
  if(action == "questions"){
    showQuestionsModal.value = true;
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
  if (!questionaireStore.isSuccess) {
    isNoData.value = true;
  } else {
    questionaires.value = questionaireStore.groupbByEntity();
    isNoData.value = false;
    console.log(questionaires.value)
  }
  // const keySelector = (value) => value.entity_name
  // const datas = questionaireStore.questionaires.reduce(function (accumulator, current) {
  //   const key = keySelector(current);
  //   (accumulator[key] = accumulator[key] || []).push(current);
  //   return accumulator;
  // }, {});
  // for(const val in datas){
  //   questionaires.value .push({
  //       entity: val,
  //       datas: datas[val]
  //     })
  // }
  // console.log(questionaires.value)
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

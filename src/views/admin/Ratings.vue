<template>
  <div class="md:ml-[250px] h-screen">
    <div class="header-container z-10">
      <header id="main-header">
        <span class="md:hidden flex">
          <i
            class="bi bi-filter-left px-5 p-1 rounded-md cursor-pointer text-white text-[30px]"
            @click="drawer.toggle"
          ></i>
        </span>
        <h1>Ratings</h1>
        <p>Cordova Public College</p>
      </header>
    </div>
    <!-- End of header-container -->
    <!-- nav section -->
    <div class="bg-gray-200 pb-2 font-poppins">
      <div class="flex items-center pb-2 pt-2 ml-2">
        <label for="search" class="block text-whitepl-2 mr-2 py-2">Search:</label>
        <input
          type="text"
          id="search"
          class="w-50 h-6 p-2 border border-gray-300 rounded-md text-black"
          v-model="searchBar"
        />
      </div>
      <div class="selectTags md:flex md:items-center mb-5 ml-2">
        <div>
          <SelectEntity
            :entities="entities"
            :entity="entity"
            @handleSelect="handleSelectEntity"
          />
        </div>
        <div v-if="entity == 'instructor'">
          <SelectDepartment
            :departments="departments"
            :selectDepartment="selectDepartment"
            @handleSelectedDepartment="handleSelectedDepartment"
          />
        </div>
        <div>
          <SelectJobType
            :selectTypeJob="selectTypeJob"
            @jobTypeSelected="handleJobTypeSelected"
          />
        </div>
      </div>
    </div>
    <!-- end of nav section -->
    <div class="card border-2">
      <transition name="fade">
        <div v-if="showRatings" class="bg-white">
          <RatingsTable
            :evaluatee="selectedEvaluate"
            :questionaire="questionaire"
            @back="handleBackBtn"
          />
        </div>
      </transition>
      <div
        v-if="showEvaluatee"
        class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5"
      >
        <ProfileCard
          class="card-box font-poppins"
          v-for="evaluatee in filteredEvaluatees"
          :evaluatee="evaluatee"
          :key="evaluatee.id"
          option="View"
          @selectedEvaluatee="selectedEvaluatee"
        />
      </div>
      <div v-if="showLoadingAnimation" class="pl-10 pr-[120px] max-h-[26rem] ml-20 mb-52">
        <LoadingAnimation />
      </div>
    </div>

    <FooterCard />
  </div>
  <!-- End of main-container -->
</template>

<script setup>
import { useDepartmentStore } from "../../stores/department";
import { useEntityStore } from "../../stores/entity";
import { useEvaluateeStore } from "../../stores/evaluatee";
import { onBeforeMount, onMounted, ref, computed } from "vue";
import { useDrawerStore } from "../../stores/drawerStore";
import { useRatingStore } from "../../stores/rating";
import ProfileCard from "@/components/ProfileCard.vue";
import SelectDepartment from "../../components/SelectDepartment.vue";
import SelectJobType from "../../components/SelectJobType.vue";
import SelectEntity from "../../components/SelectEntity.vue";
import FooterCard from "@/components/FooterCard.vue";
import RatingsTable from "../../components/RatingsTable.vue";
import LoadingAnimation from "../../components/LoadingAnimation.vue";

const drawer = useDrawerStore();
const ratingStore = useRatingStore();
const departmentStore = useDepartmentStore();
const evaluateeStore = useEvaluateeStore();

const showLoadingAnimation = ref(false);
const showRatings = ref(false);
const entityStore = useEntityStore();
const evaluatees = ref([]);
const showEvaluatee = ref(false);
const selectTypeJob = ref("All");
const selectDepartment = ref("All");
const searchBar = ref("");
const entity = ref("All");
const departments = ref([]);
const entities = ref([]);
const selectedEvaluate = ref([]);
const questionaire = ref([]);

const selectedEvaluatee = async (evaluatee_id, val, data, status) => {
  if (!status) {
    alert("Not Finished Rated");
    return;
  }
  selectedEvaluate.value = data;
  showEvaluatee.value = false;
  showLoadingAnimation.value = true;
  await ratingStore.fetchOutcomeRatings(evaluatee_id, data.entity_id);
  questionaire.value = ratingStore.ratingResult;
  console.log(questionaire.value);
  showLoadingAnimation.value = false;
  showRatings.value = true;
};

const handleBackBtn = () => {
  showRatings.value = false;
  showEvaluatee.value = true;
};

const handleSelectEntity = (val) => {
  if (val != "instructor") {
    selectDepartment.value = "All";
  }
  entity.value = val;
  evaluatees.value = evaluateeStore.filterEvaluatees(
    entity.value,
    selectDepartment.value,
    selectTypeJob.value,
    "evaluation"
  );
};

const handleSelectedDepartment = (departmentName) => {
  selectDepartment.value = departmentName;
  evaluatees.value = evaluateeStore.filterEvaluatees(
    entity.value,
    selectDepartment.value,
    selectTypeJob.value,
    "evaluation"
  );
};

const handleJobTypeSelected = (val) => {
  selectTypeJob.value = val;

  evaluatees.value = evaluateeStore.filterEvaluatees(
    entity.value,
    selectDepartment.value,
    selectTypeJob.value,
    "evaluation"
  );
};

const filteredEvaluatees = computed(() => {
  if (!searchBar.value) {
    return evaluatees.value;
  }

  return evaluatees.value.filter((data) =>
    data.name.toLowerCase().includes(searchBar.value.toLowerCase())
  );
});

onBeforeMount(async () => {
  showLoadingAnimation.value = true;
  if (!localStorage.getItem("entities")) {
    await entityStore.fetchAllEntity();
  }
  entities.value = entityStore.entities;
  if (!localStorage.getItem("departments")) {
    await departmentStore.getDepartments();
  }
  departments.value = departmentStore.departments;
  if (!localStorage.getItem("allEvaluatees")) {
    await evaluateeStore.fetchAllEvaluatees();
    showEvaluatee.value = true;
  }
  evaluatees.value = evaluateeStore.filterEvaluatees(
    entity.value,
    selectDepartment.value,
    selectTypeJob.value,
    "evaluatees"
  );
  showEvaluatee.value = true;
  showLoadingAnimation.value = false;
});
</script>

<style scoped>
.card-box {
  z-index: 1;
}
/* Code Blocks Here */
.main-container {
  overflow-y: scroll;
}

.header-container {
  background-color: #0c4a6e;
  width: 100%;
  margin: auto auto auto auto;
  position: sticky;
  top: 0;
}

.header-container #main-header {
  padding: 15px 0 15px 0;
  color: #ffffff;
  text-align: center;
}

#main-header h1 {
  color: #ffffff;
  font-size: 22px;
  font-family: Verdana;
  font-weight: bold;
}

#main-header p {
  font-size: 14px;
  font-family: Helvetica, Georgia, "Times New Roman";
}
</style>

<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins"
    style="z-index: 10000"
  >
    <div
      class="relative bg-white md:max-w-[40rem] max-w-full mx-auto mt-24 border-4 border-sky-950 rounded-xl max-h-[40rem] overflow-y-auto"
    >
      <div v-if="showCriterias">
        <div v-if="noData">
          <span> No Criterias found</span>
        </div>
        <div v-else>
          <h1>Choose Criteria</h1>
          <div
            v-for="criteria in criterias"
            class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
          >
            <input
              v-model="criteriaIds"
              :id="'bordered-checkbox-' + criteria.id"
              type="checkbox"
              :value="criteria.id"
              name="bordered-checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              :for="'bordered-checkbox-' + criteria.id"
              class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ criteria.description }}</label
            >
          </div>
        </div>
      </div>
      <div
        v-else
        class="bg-white p-[10px] pl-5 pr-32 max-w-lg mx-auto mt-40 max-h-[26rem] flex"
      >
        <div class="loader">
          <svg viewBox="0 0 80 80">
            <circle id="test" cx="40" cy="40" r="32"></circle>
          </svg>
        </div>

        <div class="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>

        <div class="loader">
          <svg viewBox="0 0 80 80">
            <rect x="8" y="8" width="64" height="64"></rect>
          </svg>
        </div>
      </div>
      <div class="flex justify-end mr-5 mb-5 gap-5">
        <p v-if="isError">Please select at least one criteria.</p>
        <button
          @click="emits('close')"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
        <button
          :disabled="criteriaIds.length === 0"
          @click="handleSavebtn"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-sky-700"
        >
          Save
        </button>
      </div>
    </div>

    <transition-group name="fade">
      <ActionSpinnerAnimation key="1" v-if="showActionSpinner" data="Saving" />
      <ActionModal
        key="2"
        v-if="showActionModal"
        @closeAction="emits('close')"
        data="Saved"
      />
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCriteriaStore } from "../stores/criteria";
import { useQuestionaireStore } from "../stores/questionaire";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";
// attachCriterias
const criteriaStore = useCriteriaStore();
const questionaireStore = useQuestionaireStore();

const props = defineProps(["questionaire"]);
const emits = defineEmits(["close", "save"]);
const showActionSpinner = ref(false);
const showActionModal = ref(false);

const criteriaIds = ref([]);
const isError = ref(false);
const criterias = ref([]);
const noData = ref(false);
const showCriterias = ref(false);

const handleSavebtn = async () => {
  if (criteriaIds.value.length === 0) {
    isError.value = true;
    return;
  } else {
    isError.value = false;
  }

  showActionSpinner.value = true;
  await questionaireStore.attachCriterias(props.questionaire.id, criteriaIds.value);
  showActionSpinner.value = false;
  if (questionaireStore.isSuccess) {
    showActionModal.value = true;
    setTimeout(() => {
      showActionModal.value = false;
      emits("close");
    });
  } else {
    alert("Something went wrong");
  }
};

onMounted(async () => {
  showCriterias.value = false;
  if (criteriaStore.criterias.length == 0) {
    await criteriaStore.fetchAllCriteria();
  }
  criterias.value = criteriaStore.criterias;
  showCriterias.value = true;
  if (criterias.value.length != 0) {
    noData.value = false;
  } else {
    noData.value = true;
  }
});
</script>

<style lang="scss" scoped></style>

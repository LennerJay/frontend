<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins"
    style="z-index: 10000"
  >
    <div
      class="relative bg-white md:max-w-[40rem] max-w-full mx-auto mt-24 border-4 border-sky-950 rounded-xl max-h-[40rem] overflow-y-auto"
    >
      <div class="flex justify-between items-center mt-4">
        <div class="invisible">.</div>
        <div class="mr-3">
          <button @click="emits('close')" id="close-btn">
            <i class="bi bi-x-lg"></i>
            <span></span>
          </button>
        </div>
      </div>
      <div
        v-if="showData"
        class="flex flex-col justify-center items-center text-center mx-6"
      >
        <div class="mx-6 mb-4 w-full">
          <table
            v-for="(criteria, index) in criterias"
            class="border border-black mx-auto w-full my-8"
          >
            <thead class="">
              <th class="flex justify-between border-b border-black py-2">
                <span class="ml-2"
                  >{{ String.fromCharCode(65 + index) }}. {{ criteria.description }}</span
                >
                <button @click="removeClick(criteria.id)" class="mr-2">Remove</button>
              </th>
            </thead>
            <tbody>
              <tr
                v-for="(question, index) in criteria.questions"
                class="text-left border-b border-black"
              >
                <td class="py-2">{{ index + 1 }}. {{ question.question }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else-if="noData">No Questions</div>
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
        <button
          @click="emits('close')"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
        <button
          @click="emits('AttachQuestion')"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Questions
        </button>
      </div>
    </div>
    <transition-group name="fade">
      <ActionSpinnerAnimation key="1" v-if="showActionSpinner" data="Removing" />
      <ActionModal
        key="2"
        v-if="showActionModal"
        @closeAction="showActionModal = false"
        data="Removed"
      />
      <WarningModal
        key="3"
        v-if="showWarning"
        action="Remove"
        @CancelDelete="showWarning = false"
        @ClickDelete="clickDelete"
      />
    </transition-group>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuestionaireStore } from "../stores/questionaire";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";
import WarningModal from "./WarningModal.vue";

const showWarning = ref(false);
const criteriaId = ref(0);

const emits = defineEmits(["close", "removeCriteria", "AttachQuestion"]);
const props = defineProps([
  "criterias",
  "showData",
  "criterias",
  "noData",
  "showActionSpinner",
  "showActionModal",
]);

const removeClick = (id) => {
  criteriaId.value = id;
  showWarning.value = true;
};

const clickDelete = () => {
  showWarning.value = false;
  emits("removeCriteria", criteriaId.value);
};

const closeActionModal = () => {};
</script>

<style scoped>
@media (min-width: 640px) {
  .loader {
    left: 120px;
  }
}
</style>

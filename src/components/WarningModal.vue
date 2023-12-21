<template>
  <div
    id="loading-overlay-delete" style="z-index: 10000"
    class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-60 p-4 "
  >
    <div ref="targetWarning">
      <div
        id="alert-additional-content-4"
        class="mt-5 p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
        role="alert"
      >
        <div class="flex items-center justify-center">
          <svg
            class="flex-shrink-0 w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
            />
          </svg>
          <span class="sr-only">Info</span>
        </div>
        <div class="mt-2 mb-4 text-sm">Do you want to {{ action }} this {{data}}?</div>
        <div class="flex justify-end">
          <button
            @click="$emit('CancelDelete')"
            type="button"
            class="text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800"
          >
            Cancel
          </button>
          <button
            @click="$emit('ClickDelete')"
            type="button"
            class="text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800"
            data-dismiss-target="#alert-additional-content-4"
            aria-label="Close"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick, ref } from "vue";

const targetWarning = ref();

const scrollToTarget = (element) => {
  nextTick(() => {
    element.scrollIntoView({ behavior: "smooth" });
  });
};
defineEmits(["CancelDelete", "ClickDelete"]);
defineProps(['data','action'])
onMounted(() => {
  scrollToTarget(targetWarning.value);
});
</script>

<style scoped></style>

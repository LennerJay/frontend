<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-20"
  >
    <div
      class="relative bg-white md:max-w-3xl max-w-sm mx-auto mt-48 border-4 border-sky-950 rounded-xl max-h-[40rem] overflow-y-auto"
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
      <div>
      
      
      </div>
      <div class="bg-white p-[10px] pl-5 pr-32 max-w-lg mx-auto mt-40 max-h-[26rem] flex">
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
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emits = defineEmits(["close"]);
const props = defineProps(["questionaireInfo", "showData"]);
</script>

<style scoped>
@media (min-width: 640px) {
  .loader {
    left: 120px;
  }
}
</style>

<template>
  <div
    id="loading-overlay"
    class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-60 p-4"
  >
    <div
      id="modal-box"
      class="flex flex-col items-center gap-2 -translate-y-1/2 p-6 bg-[#FFFFEB] rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute w-80"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="text-[#059669] mx-auto h-11 rounded-full bg-[#D1FAE5] w-11"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span class="text-2xl font-medium mt-3">Successfully {{ data }}</span>

      <div class="flex gap-6 mt-3">
        <button
          @click="emits('closeAction')"
          class="p-3 bg-[#4F46E5] rounded-lg text-white"
        >
          {{ isInstructor ? "Later" : "Close" }}
        </button>
        <button @click="emits('addClassAction')" v-if="isInstructor" class="p-3 bg-[#4F46E5] rounded-lg text-white">
          Add Class
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["data", "isInstructor"]);
const emits = defineEmits(["closeAction", "addClassAction"])

</script>

<style scoped>
#loading-overlay {
  z-index: 100000;
}
</style>

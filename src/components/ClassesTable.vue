<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-20"
  >
    <div
      class="relative bg-white p-8 md:max-w-lg max-w-sm mx-auto mt-48 border-4 border-sky-950 rounded-xl max-h-[26rem] overflow-y-auto"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps(["evaluateeClasses", "evaluateeInfo"]);
</script>

<style scoped></style>

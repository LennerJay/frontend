<template>
  <div class="flex md:ml-2">
    <label for="work-status" class="block mr-2">Work Status:</label>
    <select
      v-model="selectType"
      @change="handleTag"
      id="work-status"
      class="focus:outline-none md:w-44 h-6 text-center border text-black border-gray-300 rounded-md"
    >
      <option value="All">All</option>
      <option value="0">Part Time</option>
      <option value="1">Full Time</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  selectTypeJob: String,
});
const selectType = ref(props.selectTypeJob);
const emit = defineEmits(["jobTypeSelected"]);

const handleTag = () => {
  emit("jobTypeSelected", selectType.value);
};
</script>

<style lang="scss" scoped></style>

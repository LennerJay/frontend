<template>
  <div class="flex  ml-2">
    <label for="filter" class="block mr-2">Work Status:</label>
    <select
      v-model="selectType"
      @change="handleTag"
      id="filter"
      class="focus:outline-none rounded-2xl text-black text-center"
    >
      <option value="All">All</option>
      <option value="1">Part Time</option>
      <option value="0">Full Time</option>
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

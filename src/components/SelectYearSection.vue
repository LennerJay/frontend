<template>
  <div>
    <label for="section-year">Section & Year: </label>
    <select v-model="sY" name="section-year" id="section-year" @change="handleClick">
      <option value="All">All</option>
      <option v-for="sy in sys" :value="sy.year_section">{{ sy.year_section }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSectionYearStore } from "../stores/sectionYear";

const store = useSectionYearStore();
const sys = ref('');

const props = defineProps(["sectionYear"]);
const emits = defineEmits(["handleSelectSY"]);
const sY = ref(props.sectionYear);

const handleClick = () => {
  emits("handleSelectSY", sY.value);
  
};

onMounted(async () => {
  await store.fetchAllSectionYears();
  sys.value = store.sectionYears;
});
</script>

<style lang="scss" scoped></style>

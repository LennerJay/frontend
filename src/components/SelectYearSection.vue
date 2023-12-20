<template>
  <div class="flex">
    <label for="section-year" class="md:pr-2">Section & Year: </label>
    <select v-model="sY" name="section-year" id="section-year" @change="handleClick" class="focus:outline-none 
    rounded-2xl text-center overflow-y-auto">
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
  if(store.sectionYears.length == 0){
    await store.fetchAllSectionYears();
  }
  sys.value = store.sectionYears;
});
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  display: none;
  width: 0px;
}
.overflow-y-auto:hover::-webkit-scrollbar {
  display: block;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background-color: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgb(8, 47, 73, 1);
  border-radius: 8px;
  width: 4px;
}
</style>

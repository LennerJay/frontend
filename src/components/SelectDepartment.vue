<template>
  <div class="flex">
    <label
      for="departments"
      class="block{{ isEvaluateeRoute ? 'text-white' : 'text-black' }} mr-2"
      >Departments:</label
    >
    <select
      v-model="selectDepartment"
      @change="handleTag"
      id="departments"
      class="focus:outline-none rounded-2xl text-black text-center"
    >
      <option value="All">All</option>
      <option
        v-for="(department, departmentIndex) in departments"
        :value="department.department"
        :key="departmentIndex"
      >
        {{ department.department }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps(["selectDepartment", "option","departments"]);
const emits = defineEmits(["handleSelectedDepartment"]);

const selectDepartment = ref(props.selectDepartment);


const handleTag = () => {
  emits("handleSelectedDepartment", selectDepartment.value);
};

const isEvaluateeRoute = computed(() => route.name === "evaluatees");

</script>

<style lang="scss" scoped></style>

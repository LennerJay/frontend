<template>
  <div class="flex">
    <label
      for="filter"
      class="block{{ isEvaluateeRoute ? 'text-white' : 'text-black' }} mr-2"
      >Departments:</label
    >
    <select
      v-model="selectDepartment"
      @change="handleTag"
      id="filter"
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
import { useDepartmentStore } from "../stores/department";

import { useRoute } from "vue-router";

const route = useRoute();
const store = useDepartmentStore();

const props = defineProps(["selectDepartment", "option"]);
const emits = defineEmits(["handleSelectedDepartment"]);

const selectDepartment = ref(props.selectDepartment);
const departments = ref();

const handleTag = () => {
  emits("handleSelectedDepartment", selectDepartment.value);
};

const isEvaluateeRoute = computed(() => route.name === "evaluatees");

onMounted(async () => {
  const excluded = ["guard", "cantent-staff"];
  await store.getDepartments();
  if (route.name == "users-list") {
    departments.value = store.departments.filter((department) => {
      if (excluded.includes(department.department)) {
        return department;
      }
    });
    console.log(departments.value);
  } else {
    departments.value = store.departments;
  }
});
</script>

<style lang="scss" scoped></style>

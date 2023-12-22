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
      class="focus:outline-none rounded-2xl text-black text-center capitalize"
    >
      <option value="All">All</option>
      <option
        v-for="(department, departmentIndex) in departments"
        :value="department.name"
        :key="departmentIndex"
      >
        {{ department.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useDepartmentStore } from "../stores/department";

const props = defineProps(["selectDepartment", "option"]);
const emits = defineEmits(["handleSelectedDepartment"]);


const departmetStore = useDepartmentStore();
const selectDepartment = ref(props.selectDepartment);
const departments = ref([])

const handleTag = () => {
  emits("handleSelectedDepartment", selectDepartment.value);
};

onMounted( async()=>{
  if(!localStorage.getItem('departments')){
    await departmetStore.getDepartments()
  }
  departments.value = departmetStore.departments;
})
</script>

<style lang="scss" scoped></style>

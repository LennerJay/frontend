<template>
  <div class="flex">
    <div v-if="showRole" class="flex"></div>
    <div v-else class="flex">
      <label for="filter" class="block text-gray-700">Departments: </label>
      <select
        v-model="selectDepartment"
        @change="handleTag"
        id="filter"
        class="focus:outline-none"
      >
        <option value="All">All</option>
        <option v-for="department in departments" :value="department.department">
          {{ department.department }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDepartmentStore } from "../stores/department";
import { useRoleStore } from "../stores/role";

const store = useDepartmentStore();
const roleStore = useRoleStore();

const props = defineProps(["selectDepartment", "option"]);
const emits = defineEmits(["handleSelectedDepartment"]);

const selectDepartment = ref(props.selectDepartment);
const showRole = ref(false);
const departments = ref();
const roles = ref();

const handleTag = () => {
  emits("handleSelectedDepartment", selectDepartment.value);
};

onMounted(async () => {
  if (props.option === "roles") {
    await roleStore.fetchAllRoles();
    roles.value = roleStore.roles;
    showRole.value = true;
  } else {
    await store.getDepartments();
    departments.value = store.departments;
    console.log(departments.value);
    showRole.value = false;
  }
});
</script>

<style lang="scss" scoped></style>

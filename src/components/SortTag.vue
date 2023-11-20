<template>
  <div class="flex">
    <label for="sort">Sort: </label>
    <select
      class="focus:outline-none"
      v-model="sort"
      name="sort"
      id="sort"
      @change="$emit('handleSelectRole', sort)"
    >
      <option v-for="(role, roleIndex) in roles" :value="role.name" :key="roleIndex">
        {{ role.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoleStore } from "../stores/role";

const roleStore = useRoleStore();
const roles = ref();

const props = defineProps({
  sort: String,
});

const sort = ref(props.sort);

onMounted(async () => {
  await roleStore.fetchAllRoles();
  roles.value = roleStore.roles;
});
</script>

<style lang="scss" scoped></style>

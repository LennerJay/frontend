<template>
   <div class="flex mt-2 ml-2">
        <label for="department" class="mr-2">Department: </label>
        <select class="focus:outline-none rounded-2xl" id="department" @change="handleSelectTag">
            <option value="allDepartments" selected>All Departments</option>
            <option v-for="department in departments" :value="department.department">{{ department.department }}</option>
        </select>
   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDepartmentStore } from '../stores/department';
import { useRoleStore } from '../stores/role';

const store = useDepartmentStore();
const roleStore = useRoleStore();

const props = defineProps({
   option:String,
   selectDepartment:String
});
const emit = defineEmits(['selectedTagValue']);

const showRole = ref(false);
const department = ref(props.selectDepartment);

const departments = ref([]);
const roles = ref([]);




const handleSelectTag = ()=>{
    emit('selectedTagValue',department.value)
}


onMounted(async()=>{
   if(props.option === 'roles'){
       await roleStore.fetchAllRoles();
       roles.value = roleStore.roles;
       showRole.value = true;
   } else{
       await store.getDepartments()
       departments.value = store.departments
       showRole.value = false;
   }


})


</script>

<style  scoped>
.list{
   @apply cursor-pointer select-none p-2 hover:bg-gray-200
}
</style>
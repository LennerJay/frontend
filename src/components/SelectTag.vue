<template>
    <div class="relative w-[30rem]" ref="divRef">
       <button @click="$emit('show',true)" @keydown.escape="$emit('show',false)" :class="open && 'ring-blue-600'" class="flex w-full items-center justify-between rounded bg-white p-2 ring-1 ring-gray-300">
           <span>{{ course }}</span>
           <i class="fas fa-chevron-down text-xl"></i>
       </button>
       <ul class="z-2 absolute mt-1 w-full rounded bg-gray-50 ring-1 ring-gray-300" v-if="open">

           <div v-if="showRole">
               <li  class="list" v-for="role in roles"  @click="$emit('selectValue',`${role.name}` )">{{ role.name}}</li>
           </div>
           <div v-else>
               <li class="list"  @click="$on('selectValue','allDepartments' )">All Departments</li>
               <li class="list" v-for="department in departments"  @click="$emit('selectValue',`${department.department}` )">{{ department.department }}</li>
           </div>         
       </ul>
   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDepartmentStore } from '../stores/department';
import { useRoleStore } from '../stores/role';

const store = useDepartmentStore();
const roleStore = useRoleStore();
const departments = ref([]);
const roles = ref([]);
const divRef = ref(null)
const showRole = ref(false);

const props = defineProps({
   course: String,
   open: Boolean,
   selectedValue: String,
   option:String
});
defineExpose({
   divRef
});

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
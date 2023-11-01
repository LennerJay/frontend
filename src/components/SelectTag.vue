<template>
     <div class="relative w-[30rem]" ref="divRef">
        <button @click="$emit('option',true)" @keydown.escape="$emit('option',false)" :class="open && 'ring-blue-600'" class="flex w-full items-center justify-between rounded bg-white p-2 ring-1 ring-gray-300">
            <span>{{ course }}</span>
            <i class="fas fa-chevron-down text-xl"></i>
        </button>
        <ul class="z-2 absolute mt-1 w-full rounded bg-gray-50 ring-1 ring-gray-300" v-if="open">
            <li class="list" v-for="department in departments"  @click="$emit('selectValue',`${department.department}` )">{{ department.department }}</li>
         
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDepartmentStore } from '../stores/department';

const store = useDepartmentStore();
const departments = ref([]);
const divRef = ref(null)


defineProps({
    course: String,
    open: Boolean,
    selectedValue: String
});
defineExpose({
    divRef
});

onMounted(async()=>{
    await store.getDepartments()
    departments.value = store.departments
    console.log(departments.value)
})


</script>

<style  scoped>
.list{
    @apply cursor-pointer select-none p-2 hover:bg-gray-200
}
</style>
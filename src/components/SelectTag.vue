<template>
     <div class="relative w-[30rem]" ref="divRef">
        <button @click="$emit('option',true)" @keydown.escape="$emit('option',false)" :class="open && 'ring-blue-600'" class="flex w-full items-center justify-between rounded bg-white p-2 ring-1 ring-gray-300">
            <span>{{ course }}</span>
            <i class="fas fa-chevron-down text-xl"></i>
        </button>
        <ul class="z-2 absolute mt-1 w-full rounded bg-gray-50 ring-1 ring-gray-300" v-if="open">
            <li class="cursor-pointer select-none p-2 hover:bg-gray-200" @click="$emit('selectValue','BSIT')">BSIT</li>
            <li class="cursor-pointer select-none p-2 hover:bg-gray-200" @click="$emit('selectValue','BEED')">BEED</li>
            <li class="cursor-pointer select-none p-2 hover:bg-gray-200" @click="$emit('selectValue','BSHRM')">BSHRM</li>
        </ul>
    </div>
</template>

<script setup>
import {ref} from 'vue'
const divRef = ref(null)
defineProps({
    course: String,
    open: Boolean,
    selectedValue: String
});
defineExpose({
    divRef
});
</script>

<style lang="scss" scoped>

</style>
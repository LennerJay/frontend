<template>
     <div x-data="select" class="relative w-[30rem]" @click.outside="open = false">
        <button @click="toggle" :class="(open) && 'ring-blue-600'" class="flex w-full items-center justify-between rounded bg-white p-2 ring-1 ring-gray-300">
            <span x-text="(language == '') ? 'Choose language' : language"></span>
            <i class="fas fa-chevron-down text-xl"></i>
        </button>

        <ul class="z-2 absolute mt-1 w-full rounded bg-gray-50 ring-1 ring-gray-300" x-show="open">
            <li class="cursor-pointer select-none p-2 hover:bg-gray-200" @click="setValue('Python')">BSIT</li>
            <li class="cursor-pointer select-none p-2 hover:bg-gray-200" @click="setValue('PHP')">BEED</li>
            <li class="cursor-pointer select-none p-2 hover:bg-gray-200" @click="setValue('C#')">BSHRM</li>
        </ul>
    </div>
</template>

<script setup>
import {ref} from "vue"

    const open = false;
    const value = ref('');
    const toggle = ()=>{
        open = !open;
    }
    const setValue = (v)=>{
        value = v
    }
</script>

<style lang="scss" scoped>

</style>
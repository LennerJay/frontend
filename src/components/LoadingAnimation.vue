<template>
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center z-50 bg-sky-950 ">
        <img src="../assets/cpc_logo.png" class="animate-spin rounded-full h-16 w-16">
        <!-- <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-100"></div> -->
    </div>
    </template>
    <script setup>
    const  isLoading = true
    </script>
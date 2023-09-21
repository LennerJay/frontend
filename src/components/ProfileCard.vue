<template>
    <div class="flex items-center bg-white rounded-xl border-8" >
        <div  class="flex items-center">
            <img src="../assets/male-teacher-icon.png" class="h-32 border-r-8">
            <div class="pt-1">
                <div class="text-[15px] ml-2">{{ instructor.name }}</div>
                <div class="text-[15px] ml-2">{{ instructor.department }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    instructor:Object
});
</script>

<style scoped>

</style>
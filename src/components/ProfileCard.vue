<template>
    <div class="flex items-center bg-stone-50 rounded-xl border-8 border-stone-300 cursor-pointer
    transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-900 duration-300
     hover:text-white hover:border-sky-700">
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <img src="../assets/idpicture.jpg" class="h-32">
            </div>
            
            <div class="pt-1 ml-4">
                <div class="text-[15px]">{{ instructor.name }}</div>
                <div class="text-[15px]">{{ instructor.department }}</div>
            </div>
        </div>
    </div>
    <!-- <div class="flex items-center bg-white rounded-xl border-8" >
        <div  class="flex items-center">
            <img src="../assets/male-teacher-icon.png" class="h-32 border-r-8">
            <div class="pt-1">
                <div class="text-[15px] ml-2">{{ instructor.name }}</div>
                <div class="text-[15px] ml-2">{{ instructor.department }}</div>
            </div>
        </div>
    </div> -->
</template>

<script setup>
defineProps({
    instructor:Object
});
</script>

<style scoped>

</style>
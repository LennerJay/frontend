<template>
    <div  
    class="flex items-center bg-stone-50 rounded-xl border-8 border-stone-300 cursor-pointer
    transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-950 duration-300
     hover:text-white hover:border-sky-800">
        <div class="flex items-center" >
            <div class="flex-shrink-0">
                <img src="../assets/male-teacher-icon.png" class="h-32">
            </div>           
            <div class="pt-1 ml-2 text-left">
                <div class="text-[15px] ml-2 pb-2"><span>Name : </span>{{ evaluatee.name }}</div>
                <div v-for="departments in evaluatee.departments" class="text-[15px] ml-2"><span>Department : </span>{{ departments.department.toUpperCase() }}</div>
            </div>
        </div>
        <div id="box-content"></div>
       <button @click="handleClick(evaluatee)">{{ option }}</button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { ref, computed } from 'vue';
import { userModalStore } from '../stores/modalStore';

const emit = defineEmits(['selectedEvaluatee']);
const props = defineProps({
    evaluatee: Object,
    option: String,
});

const modalStore = userModalStore();
const selectedEvaluatee = computed(() => modalStore.selectedEvaluatee);


const handleClick = (evaluatee)=>{
    console.log('clicked')
    emit('selectedEvaluatee',evaluatee.id)
}


</script>

<style scoped>

</style>
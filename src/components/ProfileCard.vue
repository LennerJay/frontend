<template>
    <div v-for="(evaluatee, index) in evaluatees" 
    class="flex items-center bg-stone-50 rounded-xl border-8 border-stone-300 cursor-pointer
    transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-950 duration-300
     hover:text-white hover:border-sky-800">
        <div class="flex items-center" @click="modalStore.openModal(evaluatee)">
            <div class="flex-shrink-0">
                <img src="../assets/idpicture.jpg" class="h-32">
            </div>           
            <div class="pt-1 ml-2 text-left">
                <div class="text-[15px] ml-2 pb-2"><span>Name : </span>{{ evaluatee.name }}</div>
                <div v-for="departments in evaluatee.departments" class="text-[15px] ml-2"><span>Department : </span>{{ departments.department.toUpperCase() }}</div>
            </div>
        </div>
        <div id="box-content"></div>
    </div>
    <ModalCard :modalState="modalStore.modalState" :selectedEvaluatee="modalStore.selectedEvaluatee" 
    @close-modal="modalStore.modalState = false"/>
</template>

<script setup>
import { defineProps } from 'vue';
import { ref, computed } from 'vue';
import { userModalStore } from '../stores/modalStore';
import ModalCard from './ModalCard.vue';

const evaluatees = defineProps({
    evaluatee: Object
});

const modalStore = userModalStore();
const selectedEvaluatee = computed(() => modalStore.selectedEvaluatee);
</script>

<style scoped>

</style>
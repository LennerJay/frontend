<template>
    <div v-for="(evaluatee, index) in evaluatees" 
    class="flex items-center bg-stone-50 rounded-xl border-8 border-stone-300 cursor-pointer
    transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-950 duration-300
     hover:text-white hover:border-sky-800">
        <div class="flex items-center" @click="modalStore.openModal(evaluatee)">
            <div class="flex-shrink-0">
                <img src="../assets/idpicture.jpg" class="h-32">
            </div>
            
            <div class="pt-1 ml-4">
                <div class="text-[15px] ml-2 text-center">{{ evaluatee.name }}</div>
                <div v-for="departments in evaluatee.departments" class="text-[15px] ml-2">{{ departments.department }}</div>
            </div>
        </div>
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
button {
  border: none;
  display: block;
  position: relative;
  padding: 0.7em 2.4em;
  font-size: 12px;
  background: transparent;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  color: black;
  z-index: 1;
  font-family: inherit;
  font-weight: 500;
  margin-left: 5px;
}

button span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: -1;
  border: 4px solid rgba(8, 47, 73,1);
}

button span::before {
  content: "";
  display: block;
  position: absolute;
  width: 8%;
  height: 500%;
  background: var(--lightgray);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-60deg);
  transition: all 0.3s;
}

button:hover span::before {
  transform: translate(-50%, -50%) rotate(-90deg);
  width: 100%;
  background-color: rgba(7, 89, 133, 1);
}

button:hover {
  color: white;
}

button:active span::before {
  background: #2751cd;
}
</style>
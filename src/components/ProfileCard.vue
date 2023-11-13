<template>
    <div  
    class="flex items-center transparent rounded-xl border-4 font-Times New Roman border-sky-950 cursor-pointer
    hover:-translate-y-1 hover:scale-90 card-box" @click="handleClick(evaluatee)">
        <div class="flex items-center" >
            <div class="flex-shrink-0">
                <img src="../assets/male-teacher-icon.png" class="h-32">
            </div>           
            <div class="pt-1 ml-2 text-left">
                <div class="text-[15px] ml-2 pb-2"><span>Name : </span>{{ evaluatee.name }}</div>
                <div v-for="departments in evaluatee.departments" class="text-[15px] ml-2"><span>Department : </span>{{ capitalizeFirstLetter(departments.department) }}</div>
            </div>
        </div>
        <div class="card-effect"></div>
       <!-- <button @click="handleClick(evaluatee)">{{ option }}</button> -->
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
const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const handleClick = (evaluatee)=>{
    console.log('clicked')
    emit('selectedEvaluatee',evaluatee.id)
}


</script>

<style scoped>
.card-box {
  font-size: 12px;
  position: relative;
  user-select: none;
  overflow: hidden;
  color: black;
}

.card-box .card-effect {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: -1;
}
.card-box .card-effect::before {
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
.card-box:hover .card-effect::before {
  transform: translate(-50%, -50%) rotate(-90deg);
  width: 100%;
  background-color: rgba(7, 89, 133, 1);
}

.card-box:hover {
  color: white;
}

.card-box:active .card-effect::before{
  background: #2751cd;
}
</style>
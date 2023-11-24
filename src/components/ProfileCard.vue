<template>
  <div  
  class="flex items-center transparent rounded-xl border-2 font-Times New Roman border-sky-900 cursor-pointer
  hover:-translate-y-1 hover:scale-90 card-box" @click="handleClick(evaluatee.id)">
      <div class="flex items-center" >
          <div class="flex-shrink-0">
              <img src="../assets/male-teacher-icon.png" class="h-32">
          </div>           
          <div class="pt-1 ml-2 text-center overflow-hidden">
              <div class="text-[15px] ml-2 pb-2 md:w-52 rounded-2xl h-6
              bg-sky-950 text-white details"><span>Name : </span>{{ evaluatee.name.split(' ').slice(0, 2).join(' ') }}</div>
              <div v-for="(departments,index) in evaluatee.departments" :key="index" class="text-[15px] ml-2
              mt-2 md:w-52 rounded-2xl h-6
              bg-sky-950 text-white details">
                <span>Department : </span>{{ capitalizeFirstLetter(departments.department) }}
              </div>
              <div class="text-[15px] ml-2 pb-2 mt-2 md:w-52 rounded-2xl h-6
                bg-sky-950 text-white details">
                <span> {{ evaluatee.job_type == 0 ? 'Part Time' : 'Full Time' }}</span>
              </div>               
            </div>
      </div>
      <div class="card-effect"></div>
  </div>
</template>

<script setup>
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

const handleClick = (evaluatee_id)=>{
  emit('selectedEvaluatee',evaluatee_id)
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
.details {
background: linear-gradient(145deg, #fffdfd, rgb(239, 249, 255));
color: black;
}
.details {
  background: linear-gradient(145deg, #fffdfd, rgb(239, 249, 255));
  color: black;
}
</style>
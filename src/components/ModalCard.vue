<template>
<!-- Modal -->
<div class="fixed inset-0 bg-sky-950 bg-opacity-5 items-center justify-center font-Times New Roman z-20">
  <div class="bg-white p-8 max-w-md mx-auto mt-48 border-4 border-sky-950 rounded-xl max-h-[26rem] overflow-y-auto">
    <button @click="closeModal">
      <i class="bi bi-x-lg"></i>
        <span></span>
    </button>
    <div v-if="showDetail">
        <!-- Modal Header -->
        <div class="mb-4 flex flex-col">
            <h2 class="text-2xl font-semibold text-center bg-sky-950 text-white mb-2">Details</h2>
            <div class="grid gap-2 lg:grid-cols-2 sm-grid-cols-2 border-y-2 ">
                <span><i class="bi bi-person-fill mr-1"></i>Name: {{evaluateeInfo.name.split(' ').slice(0, 2).join(' ') }}</span>
                <span><i class="bi bi-calendar-check-fill mr-1"></i>Shift : {{ evaluateeInfo.job_type == 0 ?'Part time':'Full Time' }}</span>
                <span>Personnel Type: {{ evaluateeInfo.entity_name }}</span>
                <span v-if="isInstructor"><i class="bi bi-bank2 mr-1"></i>Department : <span v-for="department in evaluateeInfo.departments" >{{ department }}</span></span>
              </div>
        </div>

        <!-- Modal Body -->
          <div v-if="isInstructor" class="mb-4">
            
            <table class="max-w-screen w-full border" v-for="(klass,klassIndex) in evaluateeInfo.klasses" :key="klassIndex">
            <caption>{{ klass.department }}</caption>
              <thead>
                <tr>
                  <th class="border">Subject</th>
                  <th class="border">Sections</th>
                  <th class="border">Schedule</th>
                  <th class="border">Time</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="(section,sectionIndex) in klass.sections" :key="sectionIndex">
                  <td v-if="sectionIndex === 0" :rowspan="klass.sections.length">{{ klass.subject }}</td>
                  <td>{{ section.section_year }}</td>
                  <td>{{ section.day }}</td>
                  <td>{{ section.time }}</td>
                </tr>
              </tbody>
            </table>
          </div>

        <!-- Modal Footer -->
        <div class="flex justify-between items-center" v-if="isHistoryRoute">
          <p class="mb-2">Date Evaluated 
            <hr>
            <span class="flex ml-5">11-12-23</span>
          </p>
        </div>
    </div>
    <div v-else-if="noData">
      No data Found
    </div>
    <div v-else class="bg-white p-[10px] pl-5 pr-32 max-w-md mx-auto mt-48 max-h-[26rem] flex">
      <div class="loader">
        <svg viewBox="0 0 80 80">
          <circle id="test" cx="40" cy="40" r="32"></circle>
        </svg>
      </div>

      <div class="loader triangle">
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </div>

      <div class="loader">
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
        </svg>
      </div>
      {{ selectedEvaluteeId }}
    </div>
  </div>

</div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useEvaluateeStore } from '../stores/evaluatee';
import { useRoute } from 'vue-router';

const store = useEvaluateeStore();
const route = useRoute();
const props = defineProps([
                'isInstructor', 
                'evaluateeInfo',
                'selectedEvaluteeId',
                'showDetail',
                'noData',
              ]);
const emits = defineEmits(['close-modal'])

const closeModal = () => {
  // Emit an event to inform the parent component to close the modal
  emits('close-modal');
};
const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
const isHistoryRoute = computed(() => route.name === 'history');

onMounted(()=>{
  
})
</script>

<style scoped>
.loader {
  --path: #2f3545;
  --dot: #5628ee;
  --duration: 3s;
  width: 44px;
  height: 44px;
  position: relative;
  bottom: 100px;
  left: 50px;
}

.loader:before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  display: block;
  background: var(--dot);
  top: 37px;
  left: 19px;
  transform: translate(-18px, -18px);
  animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader svg {
  display: block;
  width: 100%;
  height: 100%;
}

.loader svg rect, .loader svg polygon, .loader svg circle {
  fill: none;
  stroke: var(--path);
  stroke-width: 10px;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.loader svg polygon {
  stroke-dasharray: 145 76 145 76;
  stroke-dashoffset: 0;
  animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader svg rect {
  stroke-dasharray: 192 64 192 64;
  stroke-dashoffset: 0;
  animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader svg circle {
  stroke-dasharray: 150 50 150 50;
  stroke-dashoffset: 75;
  animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader.triangle {
  width: 48px;
}

.loader.triangle:before {
  left: 21px;
  transform: translate(-10px, -18px);
  animation: dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

@keyframes pathTriangle {
  33% {
    stroke-dashoffset: 74;
  }

  66% {
    stroke-dashoffset: 147;
  }

  100% {
    stroke-dashoffset: 221;
  }
}

@keyframes dotTriangle {
  33% {
    transform: translate(0, 0);
  }

  66% {
    transform: translate(10px, -18px);
  }

  100% {
    transform: translate(-10px, -18px);
  }
}

@keyframes pathRect {
  25% {
    stroke-dashoffset: 64;
  }

  50% {
    stroke-dashoffset: 128;
  }

  75% {
    stroke-dashoffset: 192;
  }

  100% {
    stroke-dashoffset: 256;
  }
}

@keyframes dotRect {
  25% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(18px, -18px);
  }

  75% {
    transform: translate(0, -36px);
  }

  100% {
    transform: translate(-18px, -18px);
  }
}

@keyframes pathCircle {
  25% {
    stroke-dashoffset: 125;
  }

  50% {
    stroke-dashoffset: 175;
  }

  75% {
    stroke-dashoffset: 225;
  }

  100% {
    stroke-dashoffset: 275;
  }
}

.loader {
  display: inline-block;
  margin: 0 16px;
}

 
button {
  border: none;
  display: block;
  position: relative;
  padding: 4px 8px;
  font-size: 12px;
  background: transparent;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  color: black;
  z-index: 1;
  font-family: inherit;
  font-weight: 1500;
  margin-bottom: 10px;
  left: 97%;
  bottom: 20px;
}

button span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: -1;
  border: 2px solid rgb(109, 109, 109);
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
.overflow-y-auto::-webkit-scrollbar {
  display: none;
  width: 0px;
}
.overflow-y-auto:hover::-webkit-scrollbar {
  display: block;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background-color: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgb(8, 47, 73, 1);
  border-radius: 8px;
  width: 4px;
}
</style>
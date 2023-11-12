<template>
<!-- Modal -->
<div v-if="modalState" class="fixed inset-0 bg-sky-950 bg-opacity-5  z-50 items-center justify-center font-Times New Roman">
    <div class="bg-white p-8 max-w-md mx-auto mt-48 border-8 border-sky-950 rounded-xl">
        <!-- Modal Header -->
        <div class="mb-4 flex flex-col">
            <h2 class="text-2xl font-semibold text-center bg-sky-950 text-white">Details</h2>
            <div class="grid gap-2 lg:grid-cols-2 sm-grid-cols-2 border-y-2 ">
                <span><i class="bi bi-person-fill mr-1"></i>Name: {{ selectedEvaluatee.name.split(' ').slice(0, 2).join(' ') }}</span>
                <span><i class="bi bi-calendar-check-fill mr-1"></i>Shift : Fulltime</span>
                <span><i class="bi bi-bank2 mr-1"></i>Department : {{ selectedEvaluatee.departments[0].department.split('-')[0] }}</span>
                <span><i class="bi bi-person-fill-gear mr-1"></i>Role : Instructor</span>
            </div>
        </div>

        <!-- Modal Body -->
        <div class="mb-4">
          <table class="w-full border">
            <thead>
              <tr>
                <th class="border">Subject</th>
                <th class="border">Sections</th>
                <th class="border">Schedule</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <!-- Add your dynamic content here -->
              <tr>
                <td class="border">EDM</td>
                <td class="border">4A</td>
                <td class="border">MWF</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-between items-center">
            <p class="mb-2">Date Evaluated 
                <span class="flex ml-5">11-12-23</span>
            </p>
            <div class="flex">
                <button @click="handleEvaluate">
                    Evaluates
                    <span></span>
                </button>
                <button @click="closeModal">
                    Cancel
                    <span></span>
                </button>
            </div>
        </div>
    </div>
</div>
</template>
<script setup>

import { defineProps, ref, computed, getCurrentInstance } from 'vue';

const props = defineProps(['modalState', 'selectedEvaluatee']);
const { emit } = getCurrentInstance();
const isDone = true;


const closeModal = () => {
  // Emit an event to inform the parent component to close the modal
  emit('close-modal');
};
const handleEvaluate = () => {
  // Handle the evaluation logic if needed
  console.log('go to evaluation page');
};

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
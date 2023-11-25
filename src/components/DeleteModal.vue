<template>
    <!-- Modal container -->
  <div v-if="deleteOpen" class="fixed inset-0 bg-sky-950 bg-opacity-5 items-center justify-center font-Times New Roman">
      <div class="bg-white p-8 max-w-md mx-auto mt-48 border-4 border-sky-950 rounded-xl max-h-[26rem] overflow-y-auto">
          <button @click="isNotOpen" id="close-btn">
              <i class="bi bi-x-lg"></i>
              <span></span>
          </button>
          <div class="mb-4 flex flex-col">
              <h2 class="text-2xl font-semibold text-center bg-sky-950 text-white mb-2">Delete Teacher</h2>
          </div>
          <!-- Modal body -->
          <div class="mb-4">
                <h1>{{ evaluateeDetails.name }}</h1>
              <h1>Note:</h1>
              <p>All data from this {{ evaluateeDetails.entity.entity_name }} will also be deleted</p>
          </div>
          <!-- Modal footer -->
          <div class="flex justify-end space-x-4">
              <button @click="isNotOpen" class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  cancel
              </button>
              <button @click="handleDelete" class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Delete
              </button>
          </div>
      </div>
  </div>
</template>

<script setup>
import { userModalStore } from '../stores/modalStore';

const deleteModal = userModalStore();
const { emit } = deleteModal;
const props = defineProps([
  'deleteOpen',
  'evaluateeDetails'
]);
const emits = defineEmits(['deleteNotOpen','handleDelete']);

const isNotOpen = () => {
    emits('deleteNotOpen');
}

const handleDelete = ()=>{
    emits('handleDelete',props.evaluateeDetails.id)
}

</script>
<style scoped>
#close-btn {
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

#close-btn span {
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
background: transparent;
z-index: -1;
border: 2px solid rgb(109, 109, 109);
}

#close-btn span::before {
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

#close-btn:hover span::before {
transform: translate(-50%, -50%) rotate(-90deg);
width: 100%;
background-color: rgba(7, 89, 133, 1);
}

#close-btn:hover {
color: white;
}

#close-btn:active span::before {
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
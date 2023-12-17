<template>
  <div class="w-full flex justify-center font-sans h-screen mt-6">
    <div class="w-full lg:w-5/6">
      <div class="bg-white shadow-md rounded my-6">
        <table class="min-w-max w-full table-auto">
          <thead>
            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th class="py-3 px-6 text-left">Title</th>
              <th class="py-3 px-6 text-center"> Status</th>
              <th class="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr v-if="showLoadingDataAnimation" class="border-b border-gray-200 hover:bg-gray-100">
              <td class="py-3 px-6 text-left " colspan="3">
                <LoadingDataAnimation/>
              </td>
            </tr>
            <tr v-if="isNoData" class="border-b border-gray-200 hover:bg-gray-100">
              <td class="py-3 px-6 text-left whitespace-nowrap flex justify-center row-span-3">
                <span class="font-medium">No data Found</span>
              </td>
            </tr>
            <tr
              v-for="(questionaire, questionaireIndex) in data"
              :key="questionaireIndex"
              class="border-b border-gray-200 hover:bg-gray-100"
            >
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">{{ questionaire.title }}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-center">
                <span
                 :class="[questionaire.status  ? 'used':'un-used']" class=" py-1 px-3 rounded-full text-xs"
                  >{{ questionaire.status  ? 'Currenly Used':'Unused' }}</span
                >
              </td>
              <td class="py-3 px-6 text-center">
                <div class="flex item-center justify-center gap-2">
                  <button @click="handleClickAction(questionaire.id,'details')" id="details">Details</button>
                  <!--class="border-solid border-2 border-indigo-300"-->
                  <button @click="handleClickAction(questionaire.id,'questions')" id="questions">Questions</button>
                  <button @click="handleClickAction(questionaire.id,'delete')" id="questions">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import LoadingDataAnimation from './LoadingDataAnimation.vue';


const props = defineProps({
  data:Object,
  isNoData:Boolean,
  showLoadingDataAnimation:Boolean
});
const emits = defineEmits(['handleAction']);

const handleClickAction = (id,action)=>{
  emits('handleAction',id,action)
}
</script>

<style scoped>
  .un-used{
    @apply bg-gray-200 text-gray-600
  }
  .used{
    @apply bg-green-200 text-green-600
  }

  #details {
    outline: none;
    padding: 6px 12px;
    background-color: #0C4A6E;
    color: #ffffff;
  }

  #questions {
    outline: none;
    padding: 6px 12px;
    background-color: #0C4A6E;
    color: #ffffff;
  }

  #details:hover {
    background-color: #1885F2;
    color: #ffffff;
    cursor: pointer;
  }

  #questions:hover {
    background-color: orange;
    color: #ffffff;
    cursor: pointer;
  }

</style>
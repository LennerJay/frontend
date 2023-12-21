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
          <tbody v-if="showLoadingDataAnimation" class="text-gray-600 text-sm font-light">
            <tr class="border-b border-gray-200 hover:bg-gray-100">
              <td class="py-3 px-6 text-left " colspan="3">
                <LoadingDataAnimation/>
              </td>
            </tr>
          </tbody>
          <tbody v-if="isNoData || (datas.length == 0 && !showLoadingDataAnimation )" class="text-gray-600 text-sm font-light">
            <tr class="border-b border-gray-200 hover:bg-gray-100">
              <td class="py-3 px-6 text-center font-bold text-2xl" colspan="3">
                <span class="font-medium">No data Found</span>
              </td>
            </tr>
          </tbody>
          <tbody v-else v-for="(evaluatees,evaluateeIndex) in datas" :key="evaluatees + evaluateeIndex" class="text-gray-600 text-sm font-light" >
            <tr v-for="(questionaire,index) in evaluatees.datas" :key="questionaire.id"  class="border-b border-gray-200 hover:bg-gray-100">
              <td class="py-3 px-6 text-center">
                <span class="font-medium">{{ questionaire.title }} </span>
              </td>
              <td class="py-3 px-6 text-center">
                <span>
                  {{ questionaire.status && index == 0 ? "Currently Used" : questionaire.status ? "Used":"Unused" }}
                </span>
              </td>
              <td class="py-3 px-6 text-center">
                <div class="flex item-center justify-center gap-2">
                  <button @click="handleClickAction(questionaire.id,'details',index)" id="details">Details</button>
                  <button @click="handleClickAction(questionaire.id,'questions',index)" id="questions">Questions</button>
                  <button @click="handleClickAction(questionaire.id,'delete',index)" id="questions">Delete</button>
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
  datas:Object,
  isNoData:Boolean,
  showLoadingDataAnimation:Boolean
});
const emits = defineEmits(['handleAction']);

const handleClickAction = (id,action,index)=>{
  emits('handleAction',id,action,index)
}
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
  .currently-used{
    @apply bg-green-200 text-green-600
  }
  .un-used{
    @apply  bg-amber-100 text-amber-600
  }
  .used{
    @apply bg-gray-200 text-gray-600
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
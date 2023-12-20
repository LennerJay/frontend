<template>
  <div class="flex justify-center font-poppins h-screen">
    <div class="w-full  max-h-[550px] md:h-full overflow-y-scroll">
      <div class="transparent shadow-md rounded">
        <table class="w-full table-auto">
          <thead>
            <tr
              v-if="isStudent"
              class="bg-sky-950 text-white uppercase text-sm leading-normal"
            >
              <th class="py-3 px-6 text-left">ID Number</th>
              <th class="py-3 px-6 text-center">Status</th>
              <th class="py-3 px-6 text-left">Year & Section</th>
              <th class="py-3 px-6 text-center">Rated</th>
              <th class="py-3 px-6 text-center">Action</th>
            </tr>
            <tr v-else class="pl-10 pr-[120px] max-h-[26rem] ml-20 text-center text-white bg-sky-950">
              <th class="py-3 px-6 text-left">FullName</th>
              <th class="py-3 px-6 text-left">Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr v-if="showLoadingDataAnimation"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-200 even:dark:bg-gray-800 dark:border-gray-700
              border-b border-gray-200 hover:bg-gray-100 cursor-pointer max-h-[26rem] overflow-y-auto"
             >
              <td :colspan="isStudent ? '5':'3'">
                <LoadingDataAnimationVue/>
              </td>
            </tr>
            <tr v-if="isNoData || datas.length == 0 && !showLoadingDataAnimation"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-200 even:dark:bg-gray-800 dark:border-gray-700
              border-b border-gray-200 hover:bg-gray-100 cursor-pointer max-h-[40rem]   overflow-y-auto"
              >
             <td class="py-3 px-6 text-center font-bold text-4xl " :colspan="isStudent ? '5':'3'">
                <span class="font-medium">No data Found</span>
              </td>
            </tr>
            <tr
              v-if="isStudent"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-200 even:dark:bg-gray-800 dark:border-gray-700
              border-b border-gray-200 hover:bg-gray-100 cursor-pointer max-h-[26rem] overflow-y-auto"
              v-for="student in datas"
            >
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">{{ student.id_number }}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">{{ student.year_section.length > 1?'Irregular':'Regular' }}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-left whitespace-nowrap flex">
                <div class=" items-center" >
                  <span class="font-medium">{{ student.year_section.join(", ") }}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">{{ student.evaluatees_count != 0 ?'Done':'Not Yet' }}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-center">
                <div class="flex item-center justify-center">
                <button @click="handleActionClick(student.id_number,'view')">View</button>
                <button @click="handleActionClick(student.id_number,'reset')">Reset</button>
                <button @click="handleActionClick(student.id_number,'delete')">Delete</button>
                </div>
              </td>
            </tr>
            <tr v-else
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-200 even:dark:bg-gray-800 dark:border-gray-700
              border-b border-gray-200 hover:bg-gray-100 cursor-pointer max-h-[26rem] overflow-y-auto"
            >
              <td>asdasd</td>
              <td>asdasd</td>
              <td class="py-3 px-6 text-center">
                <button>View</button>
                <button>Delete</button>
                <button>Reset</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref } from "vue"
import LoadingDataAnimationVue from './LoadingDataAnimation.vue';

const emit = defineEmits(["selectedValueTag", "handleActionClick"]);
const props = defineProps({
  datas: Object,
  isNoData: Boolean,
  isStudent: Boolean,
  showLoadingDataAnimation:Boolean
});


const handleActionClick = (id, action) => {
  emit("handleActionClick", id, action);
};
</script>

<style scoped>

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

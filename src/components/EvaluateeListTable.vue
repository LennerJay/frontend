<template>
  <div class="bg-gray-100 flex justify-center font-poppins h-screen">
    <div class="w-full lg:w-5/6 max-h-[550px] md:max-h-[550px] overflow-y-auto">
      <div class="transparent shadow-md rounded my-6">
        <table class="min-w-[250px] md:w-full table-auto">
          <thead>
            <tr class="bg-sky-950 text-white uppercase text-sm leading-normal">
              <th class="py-3 md:px-6 text-left">Name</th>
              <th class="py-3 md:px-6 text-center">Work Status</th>
              <th class="py-3 md:px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr v-if="isNoData" class="border-b border-gray-200 hover:bg-gray-100">
              <td
                class="py-3 px-6 text-left whitespace-nowrap flex justify-center row-span-3"
              >
                <span class="font-medium">No data Found</span>
              </td>
            </tr>
            <tr
              v-for="(instructor, instructorIndex) in data"
              :key="instructorIndex"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-200 even:dark:bg-gray-800 dark:border-gray-700
              border-b border-gray-200 hover:bg-gray-100 cursor-pointer max-h-[26rem] overflow-y-auto"
            >
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">{{ instructor.name }}</span>
                </div>
              </td>
              <td class="md:py-3 md:px-6 text-center">
                <span
                  class="bg-purple-200 text-purple-600 md:py-1 md:px-3 rounded-full text-xs"
                  :class="{fullTime: instructor.job_type == 0, partTime: instructor.job_type == 1}"
                  >{{ instructor.job_type == 0 ? "Full Time" : "Part Time" }}</span
                >
              </td>
              <td class="py-3 px-6 text-center">
                <div class="flex item-center justify-center">
                  <div
                    class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    @click="handleActionClick(instructor.id, 'view')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div
                    class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    @click="handleActionClick(instructor.id, 'edit')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                  <div
                    class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    @click="handleActionClick(instructor.id, 'delete')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    > 
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
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
import { ref, onMounted, computed } from "vue";

const emit = defineEmits(["selectedValueTag", "handleActionClick"]);
const props = defineProps({
  data: Object,
  isNoData: Boolean,
});

const handleActionClick = (id, action) => {
  emit("handleActionClick", id, action);
};

onMounted(() => {});
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
.fullTime {
  color: rgb(133, 33, 226);
  background-color: rgb(233 213 255 1);
}
.partTime {
  color: rgb(51, 78, 234);
  background-color: rgb(213, 236, 255);
}
</style>

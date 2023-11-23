<template>
  <div class="card flex justify-center font-poppins h-screen">
    <div class="w-full lg:w-5/6 max-h-[550px] md:max-h-[550px] overflow-y-auto mt-12">
      <div class="transparent shadow-md rounded my-6">
        <table class="min-w-[250px] md:w-full table-auto">
          <thead>
            <tr
              v-if="isStudent"
              class="bg-sky-950 text-white uppercase text-sm leading-normal"
            >
              <th class="py-3 px-6 text-left">ID Number</th>
              <th class="py-3 px-6 text-left">FullName</th>
              <th class="py-3 px-6 text-left">Course</th>
              <th class="py-3 px-6 text-left">Section & Year</th>
              <th class="py-3 px-6 text-center">Status</th>
              <th class="py-3 px-6 text-center">Actions</th>
            </tr>
            <tr v-else class="pl-10 pr-[120px] max-h-[26rem] ml-20 text-center text-white bg-sky-950">
              <!-- <th>Name</th>
              <th>Action</th> -->
              No Data
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr v-if="isNoData" class="border-b border-gray-200 hover:bg-gray-100">
              <td
                class="py-3 px-6 text-left whitespace-nowrap flex justify-center row-span-3"
              >
                <span class="font-medium text-center">No data Found</span>
              </td>
            </tr>
            <tr
              v-else-if="isStudent"
              v-for="(user, userIndex) in data"
              :key="userIndex"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-200 even:dark:bg-gray-800 dark:border-gray-700
              border-b border-gray-200 hover:bg-gray-100 cursor-pointer max-h-[26rem] overflow-y-auto"
            >
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">{{ user.id_number }}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">{{ user.infos.fullname }}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">{{ user.infos.course }}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-center whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">{{
                    user.year_sections[0].year_section
                  }}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-center whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">{{
                    user.infos.regular == 0 ? "Regular" : "Irregular"
                  }}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-center">
                <div class="flex item-center justify-center">
                  <div
                    class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    @click="handleActionClick(user.id_number, 'view')"
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
                    @click="handleActionClick(user.id_number, 'edit')"
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
                    @click="handleActionClick(user.id_number, 'delete')"
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
            <tr v-else v-for="user in data">
              <td>{{user.infos.fullname}}</td>
              <td class="py-3 px-6 text-center">
                <div class="flex item-center justify-center">
                  <div
                    class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    @click="handleActionClick(user.id_number, 'view')"
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
                    @click="handleActionClick(user.id_number, 'edit')"
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
                    @click="handleActionClick(user.id_number, 'delete')"
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
const emit = defineEmits(["selectedValueTag", "handleActionClick"]);
const props = defineProps({
  data: Object,
  isNoData: Boolean,
  isStudent: Boolean,
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

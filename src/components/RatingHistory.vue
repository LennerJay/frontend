<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-50"
  >
    <div
      class="relative bg-white pl-5 pr-5 md:max-w-lg max-w-sm mx-auto md:mt-30 mt-12 border-4 border-sky-950 rounded-xl max-h-[42rem] overflow-y-auto"
    >
      <div class="sticky top-0 left-0 z-10 mt-4 mr-2">
        <button id="close-btn" @click="emits('close')">
          <i class="bi bi-x-lg"></i>
          <span></span>
        </button>
      </div>
      <div v-if="showData">
        <h1 class="w-full text-left text-medium border-2 border-gray-600 font-poppins">Question: {{ values[0].question }}</h1>
        <h1 class="py-2"><span class="font-bold">Rating :</span> {{ values[0].rating }}</h1>
        <table class="border w-full font-poppins border-gray-400">
          <thead class="bg-sky-900 text-white">
            <th class="text-center">Students</th>
            <th class="text-center">Year & Section</th>
            <th class="text-center">Department</th>
          </thead>
          <tbody>
            <tr v-for="data in values" class="border-b border-gray-400">
              <td class="text-center capitalize border-r border-gray-400">
                {{ data.fullName }}
              </td>
              <td class="text-center uppercase border-r border-gray-400">
                {{ data.departments.join(",") }}
              </td>
              <td class="text-center ">
                {{ data.year_section.join(",") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-else
        class="bg-white p-[10px] pl-5 pr-32 max-w-lg mx-auto mt-48 max-h-[26rem] flex"
      >
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
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["values", "showData"]);
const emits = defineEmits(["close"]);
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
</style>

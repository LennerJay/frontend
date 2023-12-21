<template>
  <!-- Modal -->
  <div
    @keydown.esc="handleEscKey"
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-Times New Roman"
    style="z-index: 10000"
  >
    <div
      class="bg-white p-8 max-w-lg mx-auto md:mt-24 mt-20 border-4 border-sky-950 rounded-xl md:max-h-full h-[80%] overflow-y-auto"
    >
      <div class="sticky top-0 left-0 z-10">
        <button id="close-btn" @click="closeModal">
          <i class="bi bi-x-lg"></i>
          <span></span>
        </button>
      </div>
      <div v-if="showDetail">
        <!-- Modal Header -->
        <div class="mb-4 flex flex-col">
          <h2 class="text-2xl font-semibold text-center bg-sky-950 text-white mb-2">
            Details
          </h2>
          <div class="grid gap-2 lg:grid-cols-2 sm-grid-cols-2 border-y-2 text-sm" id="detailed">
            <span
              ><i class="bi bi-person-fill mr-1"></i>Name: {{ evaluateeInfo.name }}</span
            >
            <span
              ><i class="bi bi-calendar-check-fill mr-1"></i>Shift :
              {{ evaluateeInfo.job_type == 0 ? "Part time" : "Full Time" }}</span
            >
            <span>Personnel Type: <span class="capitalize">{{ evaluateeInfo.entity_name }}</span></span>
            <span v-if="isInstructor"
              ><i class="bi bi-bank2 mr-1"></i>Department :
              <span v-for="department in evaluateeInfo.instructorsDepartments">{{
                department.toUpperCase()
              }}</span></span
            >
          </div>
        </div>

        <!-- Modal Body -->
        <div v-if="isInstructor" class="mb-4">
          <table
            class="max-w-screen w-full border my-4"
            v-for="(evaluateeClass, classesIndex) in evaluateeClasses"
            :key="classesIndex"
          >
            <caption class="bg-sky-900 text-white text-[16px] font-bold font-poppins">
              {{
                evaluateeClass.department.toUpperCase()
              }}
            </caption>
            <thead>
              <tr>
                <th class="border">Subject</th>
                <th class="border">Sections</th>
                <th class="border">Day</th>
                <th class="border">Time</th>
              </tr>
            </thead>
            <tbody
              class="text-center"
              v-for="(klasses, classIndex) in evaluateeClass.classes"
              :key="classIndex"
            >
              <tr v-for="(klass, klassKey) in klasses" class="border border-b mx-auto">
                <td v-if="klassKey === 0" :rowspan="klasses.length" class="border border-r capitalize">
                  {{ klass.subject }}
                </td>
                <td class="border border-r">{{ klass.section_year }}</td>
                <td class="border border-r">{{ klass.day }}</td>
                <td class="border border-r">{{ klass.time }}</td>
              </tr>
            </tbody>
          </table>

          <div class="flex justify-end mt-5" v-if="isAdmin">
            <button
              @click="closeModal"
              type="button"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              close
            </button>
            <button
              @click="emits('show-Add-Update-Modal')"
              type="button"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              {{ evaluateeClasses.length != 0 ? "Add / Update Class " : "Add Class" }}
            </button>
          </div>
        </div>

        <!-- Modal Footer -->
      </div>
      <div v-else-if="noData">No data Found</div>
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
import { ref, onMounted } from "vue";
import { useEvaluateeStore } from "../stores/evaluatee";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const isAdmin = ref(false)
const props = defineProps([
  "isInstructor",
  "evaluateeInfo",
  "selectedEvaluteeId",
  "showDetail",
  "noData",
  "evaluateeClasses",
]);
const emits = defineEmits(["close-modal", "show-Add-Update-Modal"]);

const handleEscKey = (e) => {
  console.log(e);
};

const closeModal = () => {
  emits("close-modal");
};

onMounted(() => {
  if(authStore.isAdminStaff){
    isAdmin.value = true;
  }
});
</script>

<style scoped>
#detailed {
  font-weight: 550;
}
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

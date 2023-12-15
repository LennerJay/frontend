<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-20"
  >
    <div
      class="relative bg-white md:max-w-3xl max-w-sm mx-auto mt-48 border-4 border-sky-950 rounded-xl max-h-[26rem] overflow-y-auto"
    >
      <div class="relative p-8">
        <button @click="handleClose" id="close-btn">
          <i class="bi bi-x-lg"></i>
          <span></span>
        </button>
        <!-- Modal header -->
        <div class="mb-4 flex flex-col">
          <h2 class="text-2xl font-semibold text-center bg-sky-950 text-white mb-2">
            Add Class
          </h2>
        </div>
        <div>
          <p>Instructor:{{ evaluateeInfo.name }}</p>
        </div>
        <!-- Modal body -->
        <div class="mb-4 flex flex-col">
          <div>
            <label class="block text-gray-700 text-sm font-bold pb-1" for="department"
              >Department
            </label>
            <select
              v-model="department"
              @click="handleClickDepartment"
              class="cursor-pointer border rounded text-gray-700 w-full py-2 px-3"
              id="department"
            >
              <option hidden value="">Select Department</option>
              <option v-for="department in departments" :value="department.id">
                {{ department.name.toUpperCase() }}
              </option>
            </select>
            <div class="flex items-center">
              <span class="text-white" :class="{ invisible: isDepartmentVisible }"
                >.</span
              >
              <Transition name="fade" appear>
                <span v-if="errors.department">{{ errors.department }}</span>
              </Transition>
            </div>
          </div>
          <div
            class="pt-2 grid md:gap-x-2 md:lg:grid-cols-2 md:sm-grid-cols-2 gap-x-2 gap-y-2 grid-cols-2 sm-grid-cols-2"
          >
            <div class="basis-1/4">
              <label class="flex text-gray-700 text-sm font-bold mb-2" for="subject"
                >Subject</label
              >
              <select
                @click="handleClickSubject"
                v-model="subject"
                class="cursor-pointer border rounded text-gray-700 w-full py-2 px-3 pr-2"
                id="subject"
              >
                <option hidden value="">SELECT</option>
                <option v-for="subject in subjects" :value="subject.id">
                  {{ subject.name }}
                </option>
              </select>
              <div class="flex items-center">
                <span class="text-white" :class="{ invisible: isSubjectVisible }">.</span>
                <Transition name="fade" appear>
                  <span v-if="errors.subject">{{ errors.subject }}</span>
                </Transition>
              </div>
            </div>
            <div class="basis-1/2">
              <label class="flex text-gray-700 text-sm font-bold mb-2" for="fullname"
                >Year & Section</label
              >
              <input
                v-model="sectionYear"
                @input="handleInputSectionYear"
                class="border rounded w-full py-2 px-3 md:h-10"
                id="fullname"
                type="text"
                placeholder="Eg. 1-C 2-C"
              />
              <div class="flex items-center">
                <span class="text-white" :class="{ invisible: isSYVisible }">.</span>
                <Transition name="fade" appear>
                  <span v-if="errors.sy">{{ errors.sy }}</span>
                </Transition>
              </div>
            </div>
          </div>
        </div>
        <div
          class="pt-2 grid md:gap-x-2 md:lg:grid-cols-2 md:sm-grid-cols-2 gap-x-2 gap-y-2 grid-cols-2 sm-grid-cols-2"
        >
          <div>
            <label class="flex text-gray-700 text-sm font-bold pb-1" for="time"
              >Time</label
            >
            <input
              @input="handleInputTime"
              v-model="time"
              class="border rounded w-full h-9 px-3"
              id="time"
              type="text"
              placeholder="Eg. 1:00-2:30 PM"
            />
            <div class="flex items-center">
              <span class="text-white" :class="{ invisible: isTimeVisible }">.</span>
              <Transition name="fade" appear>
                <span v-if="errors.time">{{ errors.time }}</span>
              </Transition>
            </div>
          </div>
          <div>
            <label class="flex text-gray-700 text-sm font-bold pb-1" for="day">Day</label>
            <input
              @input="handleInputDay"
              v-model="day"
              class="border rounded w-full h-9 px-3"
              id="day"
              type="text"
              placeholder="Eg. MWF, TTH, SAT"
            />
            <div class="flex items-center">
              <span class="text-white" :class="{ invisible: isDayVisible }">.</span>
              <Transition name="fade" appear>
                <span v-if="errors.day">{{ errors.day }}</span>
              </Transition>
            </div>
          </div>
          <div>
            <button
              @click="addClassBtn"
              class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Class
            </button>
          </div>
        </div>
        <table
          class="max-w-screen w-full border"
          v-for="(evaluateeClass, classesIndex) in classes"
          :key="classesIndex"
        >
          <caption>
            {{
              evaluateeClass.department
            }}
          </caption>
          <thead>
            <tr>
              <th class="border">Subject</th>
              <th class="border">Sections</th>
              <th class="border">Day</th>
              <th class="border">Time</th>
              <th class="border">Action</th>
            </tr>
          </thead>
          <tbody
            class="text-center"
            v-for="(klasses, classIndex) in evaluateeClass.classes"
            :key="classIndex"
          >
            <tr v-for="(klass, klassKey) in klasses">
              <td v-if="klassKey === 0" :rowspan="klasses.length">
                {{ klass.subject }}
              </td>
              <td>{{ klass.section_year }}</td>
              <td>{{ klass.day }}</td>
              <td>{{ klass.time }}</td>
              <td>
                <button @click="handleEdit(klass)">Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Modal footer -->
        <div class="flex justify-end">
          <button
            @click="addClassBtn"
            class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Class
          </button>
        </div>
        <Transition name="fade" v-if="showActionModal">
          <ActionModal data="Saved" @closeAction="showActionModal = false" />
        </Transition>
        <Transition name="fade">
          <ActionSpinnerAnimation v-if="showActionSpinner" data="Saving" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useClassStore } from "../stores/class";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";

const classStore = useClassStore();

const errors = ref({});

const isSubjectVisible = ref(true);
const isDepartmentVisible = ref(true);
const isSYVisible = ref(true);
const isTimeVisible = ref(true);
const isDayVisible = ref(true);
const showActionSpinner = ref(false);
const showActionModal = ref(false);
const day = ref("");
const time = ref("");
const department = ref("");
const sectionYear = ref(null);
const subject = ref("");
const classes = ref(props.evaluateeClasses);

const props = defineProps([
  "departments",
  "subjects",
  "sectionYears",
  "evaluateeInfo",
  "evaluateeClasses",
]);
const emits = defineEmits(["closeAddUpdate"]);

const handleEdit = (ojb)=>{
console.log(ojb)
}

const addClassBtn = async () => {
  let klass = {};
  if (validateInput()) {
    return;
  }
  const findSectionYear = props.sectionYears.find(
    (item) => item.year_section === sectionYear.value
  );
  console.log(findSectionYear);
  if (!findSectionYear) {
    errors.value.sy = "Section not Registered";
    return;
  }

  klass.evaluatee_id = props.evaluateeInfo.id;
  klass.department_id = department.value;
  klass.subject_id = subject.value;
  klass.s_y_id = findSectionYear.id;
  klass.time = time.value;
  klass.day = day.value;
  showActionSpinner.value = true;
  await classStore.saveClass(klass);
  showActionSpinner.value = false;
  if (classStore.isSuccess) {
    showActionModal.value = true;
    setTimeout(function () {
      showActionModal.value = false;
    }, 1500);
  }
  // department.value = "";
  // sectionYear.value = "";
  // subject.value = "";
  // time.value = "";
  // day.value = "";
};

const validateInput = () => {
  let isError = false;
  if (department.value.length == 0) {
    errors.value.department = "Please Select a department";
    isError = true;
  }
  if (sectionYear.value == "" || sectionYear.value == null) {
    errors.value.sy = "Please provide a year and section";
    isError = true;
  }
  if (subject.value.length == 0) {
    errors.value.subject = "Please provide a subject";
    isError = true;
  }
  if (time.value == "") {
    errors.value.time = "Please provide a time";
    isError = true;
  }
  if (day.value == "") {
    errors.value.day = "Please provide a day";
    isError = true;
  }

  return isError;
};

const handleClose = () => {
  emits("closeAddUpdate");
};

const handleInputDay = () => {
  errors.value.day = "";
};

const handleInputTime = () => {
  errors.value.time = "";
};

const handleInputSectionYear = () => {
  errors.value.sy = "";
};

const handleClickSubject = () => {
  errors.value.subject = "";
};

const handleClickDepartment = () => {
  errors.value.department = "";
};

watch(sectionYear, (newVal, OldVal) => {
  newVal.toUpperCase();
  sectionYear.value = newVal.toUpperCase();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
</style>

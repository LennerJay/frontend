<template>
  <!-- Modal container -->
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-Times New Roman z-20"
  >
    <div
      class="relative bg-white p-8 max-w-md mx-auto mt-48 border-4 border-sky-950 rounded-xl max-h-[26rem] overflow-y-auto"
    >
      <button @click="closeEditModal" id="close-btn">
        <i class="bi bi-x-lg"></i>
        <span></span>
      </button>
      <div class="flex items-center mb-4">
        <span :class="{ invisible: isVisible }">.</span>
        <Transition name="bounce" appear>
          <span v-show="showError">Nothing's changed</span>
        </Transition>
      </div>
      <div class="mb-4 mt-4 flex flex-col">
        <h2 class="text-2xl font-semibold text-center bg-sky-950 text-white mb-2">
          Edit Evaluatee
        </h2>
      </div>
      <!-- Modal body -->
      <div class="mb-4">
        <div class="mb-4 flex flex-col">
          <div class="grid gap-x-2 lg:grid-cols-1 sm-grid-cols-1 grid-cols-1">
            <label class="flex text-gray-700 text-sm font-bold mb-2" for="edit-fullName"
              >Full Name</label
            >
            <input
              @input="handleInput"
              id="edit-fullName"
              v-model="name"
              class="border rounded w-full py-2 px-3 md:h-10"
              type="text"
              placeholder="Enter Full name"
            />
            <div class="flex items-center">
              <span class="text-white" :class="{ invisible: isVisible }">.</span>
              <Transition name="fade" appear>
                <span v-if="errors.name">{{ errors.name }}</span>
              </Transition>
            </div>

            <div class="grid gap-x-2 lg:grid-cols-2 sm-grid-cols-2 grid-cols-2 pt-2">
              <div>
                <label class="flex text-gray-700 text-sm font-bold pb-1" for="edit-shift"
                  >Shift</label
                >
                <select
                  id="edit-shift"
                  v-model="shift"
                  class="cursor-pointer border rounded text-gray-700 w-full py-2 px-3 h-10"
                >
                  <option value="0">Part Time</option>
                  <option value="1">Full Time</option>
                </select>
              </div>
              <div>
                <label
                  class="flex text-gray-700 text-sm font-bold pb-1"
                  for="edit-personal-type"
                  >Personal Type</label
                >
                <select
                  v-model="personelType"
                  @change="handleChange"
                  class="cursor-pointer border rounded text-gray-700 w-full py-2 px-3 h-10"
                  id="edit-personal-type"
                >
                  <option v-for="entity in entities" :value="entity.id">
                    {{ entity.entity_name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal footer -->
      <div class="flex justify-end gap-6">
        <button
          @click="closeEditModal"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          @click="handleSave"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
      <Transition name="fade" v-if="showActionModal">
        <ActionModal
          data="Updated"
          :isInstructor="personelType == 1"
          @closeAction="closeEditModal"
        />
      </Transition>
      <Transition name="fade">
        <ActionSpinnerAnimation v-if="showActionSpinner" data="Updating" />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useEvaluateeStore } from "../stores/evaluatee";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";

const evaluateeStore = useEvaluateeStore();
const showActionSpinner = ref(false);
const showActionModal = ref(false);
const errors = ref({});
const personelType = ref(props.evaluateeDetails.entity_id);
const shift = ref(props.evaluateeDetails.job_type);
const name = ref(props.evaluateeDetails.name);
const isVisible = ref(true);
const showError = ref(false);
const isActionSuccess = ref(false);

const props = defineProps(["entities", "departments", "subjects", "evaluateeDetails"]);
const emits = defineEmits(["closeEditModal"]);

const handleInput = () => {
  errors.value = [];
};

const closeEditModal = () => {
  if (compareData() && !isActionSuccess.value) {
    if (confirm("Do you want to close? Changes may not be save") == true) {
      emits("closeEditModal");
    }
  } else {
    isActionSuccess.value = false;
    emits("closeEditModal");
  }
};

const handleSave = async () => {
  if (name.value == "") {
    errors.value.name = "name is required";
    return;
  }
  if (compareData()) {
    const data = {
      name: name.value,
      job_type: shift.value,
      entity_id: personelType.value,
    };
    showActionSpinner.value = true;
    await evaluateeStore.updateEvaluatee(props.evaluateeDetails.id, data);
    showActionSpinner.value = false;
    if (evaluateeStore.isSuccess) {
      showActionModal.value = true;
      isActionSuccess.value = true;
      setTimeout(function () {
        showActionModal.value = false;
        emits("closeEditModal");
      }, 3000);
    } else {
      errors.value.name = "Name Already Exists";
    }
  } else {
    showError.value = true;
    isVisible.value = false;
    setTimeout(function () {
      isVisible.value = true;
      showError.value = false;
    }, 2000);
  }
};

const compareData = () => {
  return (
    props.evaluateeDetails.entity_id != personelType.value ||
    props.evaluateeDetails.job_type != Number(shift.value) ||
    props.evaluateeDetails.name != name.value
  );
};
</script>
<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
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
  position: absolute;
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
  left: 86%;
  top: 20px;
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

<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-20"
  >
    <div
      class="relative bg-white p-8 md:max-w-lg max-w-sm mx-auto mt-48 border-4 border-sky-950 rounded-xl max-h-[26rem] overflow-y-auto"
    >
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
      <!-- Modal body -->
      <div class="mb-4">
        <!-- Modal content header -->
        <div class="mb-4 flex flex-col">
          <div class="grid gap-x-2 lg:grid-cols-1 sm-grid-cols-1 grid-cols-1">
            <div ref="nameInputElement">
              <label class="flex text-gray-700 text-sm font-bold mb-2" for="fullname"
                >Full Name</label
              >
              <input
                v-model="name"
                @input="handleInput"
                class="border rounded w-full py-2 px-3 md:h-10"
                id="fullname"
                type="text"
                placeholder="Enter Full name"
              />
              <div class="flex items-center">
                <span class="text-white" :class="{ invisible: isVisible }">...</span>
                <Transition name="fade" appear>
                  <span v-if="errors.name">{{ errors.name }}</span>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal footer -->
      <div class="flex justify-end">
        <button
          @click="handleSaveButton"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
      <Transition name="fade" v-if="showActionModal">
        <ActionModal
          data="Saved"
          :isInstructor="personelType == 1"
          @closeAction="handleClose"
        />
      </Transition>
      <Transition name="fade">
        <ActionSpinnerAnimation v-if="showActionSpinner" data="Saving" />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useClassStore } from "../stores/class";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";

const classStore = useClassStore()

const name = ref("");
const errors = ref({});
const isVisible = ref(false);
const showActionSpinner = ref(false);
const showActionModal = ref(false);

const emits = defineEmits(['closeAddUpdate'])

const handleInput = () => {};

const handleClose = () => {

  emits('closeAddUpdate')
};
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

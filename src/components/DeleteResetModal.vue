<template>
  <!-- Modal container -->
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-Times New Roman z-50"
  >
    <div
      class="relative bg-white p-8 max-w-md mx-auto mt-48 border-4 border-sky-950 rounded-xl max-h-[26rem] overflow-y-auto"
    >
      <button @click="handleCloseButton" id="close-btn">
        <i class="bi bi-x-lg"></i>
        <span></span>
      </button>
      <div v-if="showData">
        <div class="mb-4 flex flex-col items-center">
          <i
            class="fa fa-exclamation-triangle text-red-400 text-5xl"
            aria-hidden="true"
          ></i>
        </div>
        <!-- Modal body -->
        <div class="mb-4 flex flex-col items-center">
          <div class="mb-2">
            <span v-if="action == 'reset'">Reset Password </span>
            <span v-else>Delete Student </span>
          </div>
          <p class="text-center mb-2">
            Fullname: {{ userInfo.fullname ?? "Not yet Updated" }}
          </p>
          <p class="text-center">Id Number:{{ userInfo.id_number ?? idNumber }}</p>
        </div>
        <!-- Modal footer -->
        <div class="flex justify-end space-x-4">
          <button
            @click="handleCloseButton"
            class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            cancel
          </button>
          <button
            v-if="action == 'delete'"
            @click="handleDelete"
            class="bg-sky-950 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
          <button
            v-if="action == 'reset'"
            @click="handleReset"
            class="bg-sky-950 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
        </div>
        <Transition name="fade" v-if="showActionModal">
          <ActionModal :data="actionModalData" @closeAction="handleCloseButton" />
        </Transition>
        <Transition name="fade">
          <ActionSpinnerAnimation v-if="showActionSpinner" :data="actionSpinnerData" />
        </Transition>
      </div>
      <div
        v-else
        class="bg-white p-[10px] pl-5 pr-32 max-w-lg mx-auto mt-36 max-h-[26rem] flex"
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
import { ref } from "vue";
import { useUserStore } from "../stores/users";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";

const userStore = useUserStore();
const props = defineProps(["userInfo", "action", "showData", "idNumber"]);
const emits = defineEmits(["closeDeleteResetModal"]);

const showActionSpinner = ref(false);
const showActionModal = ref(false);
const actionModalData = ref("");
const actionSpinnerData = ref("");

const handleCloseButton = () => {
  emits("closeDeleteResetModal");
};

const handleDelete = async () => {
  actionModalData.value = "Deleted";
  actionSpinnerData.value = "Deleting";
  showActionSpinner.value = true;
  await userStore.removeUser(props.idNumber);
  showActionSpinner.value = false;
  if (userStore.isSuccess) {
    showActionModal.value = true;
    setTimeout(() => {
      showActionModal.value = false;
      handleCloseButton();
    }, 2000);
  } else {
    alert("Something went wrong");
  }
};

const handleReset = async () => {
  actionModalData.value = "Updated";
  actionSpinnerData.value = "Updating";
  showActionSpinner.value = true;
  await userStore.updatePassword(props.idNumber);
  showActionSpinner.value = false;
  if (userStore.isSuccess) {
    showActionModal.value = true;
    setTimeout(() => {
      showActionModal.value = false;
      handleCloseButton();
    }, 2000);
  } else {
    alert("Something went wrong");
  }
};
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

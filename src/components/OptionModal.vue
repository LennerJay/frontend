<template>
  <!-- Modal container -->
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins"
    style="z-index: 10000"
  >
    <div
      class="relative bg-white p-8 max-w-md mx-auto mt-48 border-4 border-sky-950 rounded-xl max-h-[30rem] overflow-y-auto overflow-x-hidden"
    >
      <transition name="slide-fade">
        <div class="absolute w-11/12 top-3 left-5 z-20" v-if="showResponseError">
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold mr-5">Warning</strong>
            <span class="block sm:inline text-rose-600">Name already exist</span>
            <span
              class="absolute top-0 bottom-0 right-0 px-4 py-3"
              @click="showResponseError = false"
            >
              <svg
                class="fill-current h-6 w-6 text-rose-600"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path
                  d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                />
              </svg>
            </span>
          </div>
        </div>
      </transition>

      <button @click="closeModal" id="close-btn">
        <i class="bi bi-x-lg"></i>
        <span></span>
      </button>
      <div v-if="action == 'Delete'">
        <div class="mb-4 flex flex-col items-center">
          <i
            class="fa fa-exclamation-triangle text-red-400 text-5xl"
            aria-hidden="true"
          ></i>
        </div>
      </div>
      <div v-else class="mb-4 flex flex-col">
        <h2 class="text-2xl font-semibold text-center bg-sky-950 text-white mb-2">
          {{ action }} {{ option }}
        </h2>
      </div>
      <!-- Modal body -->
      <div v-if="action != 'Delete'" class="flex flex-col">
        <div class="flex items-center mb-2 mt-2">
          <label
            class="text-left block text-gray-500 font-bold mb-1 md:mb-0 pr-4 flex-grow min-w-[100px]"
            for="option-name"
          >
            {{ option == "Announcements" ? "Announcement" : "Name" }}
          </label>
          <textarea
            v-if="option == 'Announcements'"
            @input="nameInput"
            v-model="name"
            id="option-name"
            class="w-full h-full bg-transparent text-blue-gray-700 font-poppins capitalize font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
          >
          </textarea>
          <input
            v-else
            @input="nameInput"
            v-model="name"
            id="option-name"
            class="w-full h-full bg-transparent text-blue-gray-700 font-poppins capitalize font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
          />
        </div>
        <div class="flex items-center">
          <span class="flex-grow min-w-[90px] invisible">.</span>
          <transition name="fade">
            <span class="w-full pl-3 text-rose-600" v-if="isError">
              Please enter
              {{ option == "Announcements" ? "an Announcement" : "a name" }}</span
            >
          </transition>
        </div>
      </div>
      <div v-else class="text-center">
        All related data will be deleted, are you want to delete?
      </div>
      <!-- Modal footer -->
      <div class="flex justify-end space-x-4 mt-4 items-center">
        <Transition name="bounce" appear>
          <span v-show="showError" class="font-bold mr-5 text-rose-600"
            >Nothing's changed</span
          >
        </Transition>

        <button
          @click="closeModal"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          cancel
        </button>
        <button
          @click="handleSaveAction"
          v-if="action == 'Delete'"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
        <button
          v-else
          @click="handleSaveAction"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
      <transition-group name="fade">
        <ActionSpinnerAnimation v-if="showActionSpinner" :data="actionSpinnerData" />
        <ActionModal v-if="showActionModal" :data="actionModalData" />
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDepartmentStore } from "../stores/department";
import { useSubjectStore } from "../stores/subject";
import { useEntityStore } from "../stores/entity";
import { useAnnouncementStore } from "../stores/announcement";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";

const announcementStore = useAnnouncementStore();
const departmentStore = useDepartmentStore();
const subjectStore = useSubjectStore();
const entityStore = useEntityStore();

const showActionModal = ref(props.actionModal);
const showActionSpinner = ref(props.actionSpinner);
const name = props.data ? ref(props.data.name) : ref("");
const isError = ref(false);
const showError = ref(false);
const showResponseError = ref(false);
const actionModalData = ref("");
const actionSpinnerData = ref("");
const props = defineProps(["option", "action", "data"]);
const emits = defineEmits(["closeButton"]);

const nameInput = () => {
  isError.value = false;
};

const closeModal = () => {
  if (name.value == "" && props.action != "Edit") {
    emits("closeButton");
    return;
  }
  if (props.action == "Delete") {
    emits("closeButton");
    return;
  }
  if (props.data && props.data.name == name.value) {
    emits("closeButton");
    return;
  }
  if (confirm("Are you sure you want to close?") == true) {
    emits("closeButton");
    return;
  }
};

const handleSaveAction = () => {
  showError.value = false;
  isError.value = false;
  if (name.value == "") {
    isError.value = true;
    return;
  }
  if (props.data && props.data.name == name.value && props.action != "Delete") {
    showError.value = true;
    return;
  }
  if (props.option == "Departments") {
    handleDepartment();
  } else if (props.option == "Year & Sections") {
    handleSectionYear();
  } else if (props.option == "Evaluatee Type") {
    handleEvaluatee();
  } else if (props.option == "Subjects") {
    handleSubject();
  } else if (props.option == "Announcements") {
    handleAnnouncement();
  }
};

const handleEvaluatee = async () => {
  showActionSpinner.value = true;
  if (props.action == "Add") {
    actionSaveData();
    await entityStore.saveEntity(name.value);
  }
  if (props.action == "Edit") {
    actionUpdateData();
    await entityStore.saveUpdateEntity(props.data.id, name.value);
  }
  if (props.action == "Delete") {
    actionDeleteData();
    await entityStore.removeEntity(props.data.id);
  }
  showActionSpinner.value = false;
  if (!entityStore.isResponseSuccess) {
    responseTimeout();
    return;
  }
  if (entityStore.isSuccess) {
    handleActionModal();
    return;
  }
};

const handleSubject = async () => {
  showActionSpinner.value = true;
  if (props.action == "Add") {
    actionSaveData();
    await subjectStore.addSubject(name.value);
  }
  if (props.action == "Edit") {
    actionUpdateData();
    await subjectStore.saveUpdateSubject(props.data.id, name.value);
  }
  if (props.action == "Delete") {
    actionDeleteData();
    await subjectStore.removeSubject(props.data.id);
  }
  showActionSpinner.value = false;
  if (!subjectStore.isResponseSuccess) {
    responseTimeout();
    return;
  }
  if (subjectStore.isSuccess) {
    handleActionModal();
    return;
  }
};

const handleSectionYear = async () => {
  if (action.value == "Add") {
  }
  if (action.value == "Add") {
  }
};

const handleDepartment = async () => {
  showActionSpinner.value = true;
  if (props.action == "Add") {
    actionSaveData();
    await departmentStore.saveDepartment(name.value);
  }
  if (props.action == "Edit") {
    actionUpdateData();
    await departmentStore.saveUpdateDepartment(props.data.id, name.value);
  }
  if (props.action == "Delete") {
    actionDeleteData();
    await departmentStore.removeDepartment(props.data.id);
  }
  showActionSpinner.value = false;
  if (!departmentStore.isResponseSuccess) {
    responseTimeout();
    return;
  }
  if (departmentStore.isSuccess) {
    handleActionModal();
    return;
  }
};

const handleAnnouncement = async () => {
  showActionSpinner.value = true;
  if (props.action == "Add") {
    actionSaveData();
    await announcementStore.saveAnnouncement(name.value);
  }
  if (props.action == "Edit") {
  }
  if (props.action == "Delete") {
    actionDeleteData();
    await announcementStore.deleteAnnouncements(props.data.id);
  }
  if (props.action == "updateStatus") {
  }
  showActionSpinner.value = false;
  if (announcementStore.isSuccess) {
    handleActionModal();
    return;
  } else {
    alert("Something went wrong");
  }
};

const actionSaveData = () => {
  actionModalData.value = "Saved";
  actionSpinnerData.value = "Saving";
};

const actionUpdateData = () => {
  actionModalData.value = "Updated";
  actionSpinnerData.value = "Updating";
};

const actionDeleteData = () => {
  actionModalData.value = "Deleted";
  actionSpinnerData.value = "Deleting";
};

const responseTimeout = () => {
  showResponseError.value = true;
  setTimeout(() => {
    showResponseError.value = false;
  }, 2000);
};

const handleActionModal = () => {
  showActionModal.value = true;
  setTimeout(() => {
    showActionModal.value = false;
    emits("closeButton");
  }, 1500);
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
  left: 95%;
  bottom: 15px;
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

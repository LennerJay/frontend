<template>
  <!-- Modal container -->
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
          Create {{ entityName == "All" ? "instructor" : entityName }}
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
                class="border rounded w-full py-2 px-3 md:h-10"
                id="fullname"
                type="text"
                placeholder="Enter Full name"
              />
              <p v-if="errors.name">{{ errors.name }}</p>
            </div>
            <div class="grid gap-x-2 lg:grid-cols-2 sm-grid-cols-2 grid-cols-2 pt-2">
              <div>
                <label class="flex text-gray-700 text-sm font-bold pb-1" for="shift"
                  >Shift</label
                >
                <select
                  v-model="shift"
                  class="cursor-pointer border rounded text-gray-700 w-full py-2 px-3 h-10"
                  id="shift"
                >
                  <option value="0">Part Time</option>
                  <option value="1">Full Time</option>
                </select>
              </div>
              <div>
                <label
                  class="flex text-gray-700 text-sm font-bold pb-1"
                  for="personal-type"
                  >Personal Type</label
                >
                <select
                  v-model="personelType"
                  @change="handleChange"
                  class="cursor-pointer border rounded text-gray-700 w-full py-2 px-3 h-10"
                  id="personal-type"
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
      <div class="flex justify-end">
        <button
          @click="handleSaveButton"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
      <ActionSpinnerAnimation v-if="showActionSpinner" data="Saving" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useEvaluateeStore } from "../stores/evaluatee";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";

const evaluateeStore = useEvaluateeStore();
const nameInputElement = ref(null);
const status = ref();
const message = ref("");
const errors = ref({});
const entities = ref(props.entities);
const name = ref("");
const shift = ref(0);
const personelType = ref(props.entityId);
const showTable = ref(false);
const entityName = ref(props.entity);
const showActionSpinner = ref(false);

const props = defineProps([
  "entities",
  "entity",
  "entityId",
  "departments",
  "subjects",
  "sectionYears",
]);
const emits = defineEmits(["handleCloseButton", "handleCreateClick"]);

const handleChange = () => {
  if (personelType.value !== 1) {
    showTable.value = false;
  } else {
    showTable.value = true;
  }

  entityName.value = entities.value.find(
    (entity) => entity.id == personelType.value
  ).entity_name;
};

const handleClose = () => {
  //  shift.value = ref(0)
  // department.value = ref(props.departments[0].id);
  // personelType.value = ref(props.entities[0].id)
  emits("handleCloseButton");
};

const handleSaveButton = async () => {
  const val = {};
  if (name.value == "") {
    errors.value.name = "name is required";
    nameInputElement.value.scrollIntoView({ behavior: "smooth" });
    return;
  }
  val.name = name.value;
  val.entity_id = personelType.value;
  val.job_type = shift.value;

  showActionSpinner.value = true;
  await evaluateeStore.saveEvaluatee(val);
  showActionSpinner.value = false;
  if (evaluateeStore.isSuccess) {
    alert("Successfully saved");
    emits("handleCloseButton");
  } else {
    errors.value.name = evaluateeStore.errorMessage;
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
.overflow-auto::-webkit-scrollbar {
  display: none;
  width: 0px;
}
.overflow-auto:hover::-webkit-scrollbar {
  display: block;
}
.overflow-auto::-webkit-scrollbar-track {
  background-color: transparent;
}
.overflow-auto::-webkit-scrollbar-thumb {
  background-color: rgb(8, 47, 73, 1);
  border-radius: 8px;
  width: 4px;
}
</style>

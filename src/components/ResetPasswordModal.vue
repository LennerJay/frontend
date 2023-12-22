<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-40"
  >
    <div
      class="relative p-5 bg-white md:max-w-[30rem] max-w-full mx-auto md:mt-52 mt-32 border-4 border-sky-950 rounded-xl max-h-[50rem] overflow-y-auto"
    >
      <h1 class="text-[25px] font-bold">
        <span class="border-b-2 border-sky-900">Res</span>et Password
      </h1>
      <form>
        <div class="flex flex-col mt-4 w-full h-full">
          <div class="pb-4">
            <label for="fname" class="font-semibold">New Password</label>
            <input
              @input="passInput"
              v-model="password"
              type="password"
              autocomplete="on"
              placeholder="Enter Your New Password...."
              class="capitalize border rounded w-full h-10 pl-2"
            />
            <div class="flex items-center">
              <span class="text-white invisible">.</span>
              <Transition name="fade" appear>
                <span v-if="errors.pass" class="text-rose-600">{{ errors.pass }}</span>
              </Transition>
            </div>
          </div>
          <div class="pb-4">
            <label for="mname" class="font-bold">Repeat New Password</label>
            <input
              @input="newPassInput"
              v-model="newPassword"
              type="password"
              autocomplete="on"
              placeholder="Repeat Your New Password...."
              class="capitalize border rounded w-full h-10 pl-2"
            />
            <div class="flex items-center">
              <span class="text-white invisible">.</span>
              <Transition name="fade" appear>
                <span v-if="errors.newPass" class="text-rose-600">{{
                  errors.newPass
                }}</span>
              </Transition>
            </div>
          </div>
        </div>
      </form>
      <span class="text-rose-600 pl-3" v-if="isInvalid">'Not Matched'</span>
      <div class="flex justify-end mt-4 items-center gap-5">
        <button
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="handleClose"
        >
          Close
        </button>
        <button
          @click="handleSave"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-sky-900"
        >
          Save
        </button>
      </div>

      <transition-group name="fade">
        <ActionSpinnerAnimation key="1" v-if="showActionSpinner" data="Saving" />
        <ActionModal
          key="2"
          v-if="showActionModal"
          data="Saved"
          @closeAction="emits('close')"
        />
      </transition-group>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/users";
import { userModalStore } from "../stores/modalStore";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";

const showActionSpinner = ref(false);
const showActionModal = ref(false);
const store = useUserStore();

const props = defineProps(["user"]);

const emits = defineEmits(["close"]);

const errors = ref({});
const password = ref("");
const newPassword = ref("");
const isInvalid = ref(false);
const modalStore = userModalStore();

const handleClose = () => {
  if (password.value != "" || newPassword.value != "") {
    if (confirm("Are you sure you want to close?") == true) {
      emits("close");
    }
  } else {
    emits("close");
  }
};

const handleSave = async () => {
  if (validateInputs()) {
    return;
  }

  showActionSpinner.value = true;
  await store.changePass(props.user.id_number, newPassword.value);
  showActionSpinner.value = false;
  if (store.isSuccess) {
    showActionModal.value = true;
    setTimeout(() => {
      password.value = "";
      newPassword.value = "";
      showActionModal.value = false;
      emits("close");
    }, 1500);
  } else {
    alert("Something went wrong");
  }
};

const validateInputs = () => {
  let isError = false;
  if (password.value == "") {
    errors.value.pass = "Please enter a password";
    isError = true;
  }
  if (newPassword.value == "") {
    errors.value.newPass = "Please enter a password";
    isError = true;
  }
  if (password.value !== newPassword.value) {
    isInvalid.value = true;
    isError = true;
  }

  return isError;
};

const passInput = () => {
  errors.value.pass = "";

  if (password.value === newPassword.value) {
    isInvalid.value = false;
  }
};

const newPassInput = () => {
  errors.value.newPass = "";
  if (password.value === newPassword.value) {
    isInvalid.value = false;
  }
};
</script>

<style scoped></style>

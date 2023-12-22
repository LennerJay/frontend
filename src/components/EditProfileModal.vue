<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-40"
  >
    <div
      class="relative p-5 bg-white md:max-w-[40rem] max-w-full mx-auto md:mt-40 mt-32 border-4 border-sky-950 rounded-xl max-h-[50rem] overflow-y-auto"
    >
      <h1 class="text-[25px] font-bold">
        <span class="border-b-2 border-sky-900">Stu</span>dent Details
      </h1>
      <div class="flex flex-col mt-4">
        <div class="grid grid-cols-2 w-full h-full gap-4">
          <div>
            <label for="fname" class="font-bold">First Name</label>
            <input
             v-model="firstName"
             id='fname'
              type="text"
              placeholder="Enter Your First Name"
              class="capitalize border rounded w-full h-10 pl-2"
            />
          </div>
          <div>
            <label for="mname" class="font-bold">Middle Name</label>
            <input
                v-model="middleName"
              type="text"
              id='mname'
              placeholder="Middle Name"
              class="capitalize border rounded w-full h-10 pl-2"
            />
          </div>
          <div>
            <label for="lname" class="font-bold">Last Name</label>
            <input
            v-model="lastName"
              type="text"
              placeholder="Last Name"
              class="capitalize border rounded w-full h-10 pl-2"
            />
          </div>
          <div>
            <label for="mobile_number" class="font-bold">Mobile Number</label>
            <input
                v-model="mobile"
                id="mobile_number"
              type="text"
              placeholder="Mobile Number"
              class="capitalize border rounded w-full h-10 pl-2"
            />
          </div>
          <div>
            <label for="email" class="font-bold">Email</label>
            <input
                v-model="email"
                id="email"
              type="email"
              placeholder="Email"
              class="capitalize border rounded w-full h-10 pl-2"
            />
          </div>
          <div>
            <label for="course" class="font-bold">Course</label>
            <input
            v-model="course"
                id="course"
              type="text"
              placeholder="Course"
              class="capitalize border rounded w-full h-10 pl-2"
            />
            <!-- <div class="flex items-center mt-2 pl-2">
                <span class=" text-white invisible">asdasd</span>
                <Transition name="fade" appear>
                  <span v-if="errors.course" class="text-rose-600">{{ errors.course }}</span>
                </Transition>
              </div> -->
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4 items-center gap-5">
        <button
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="handleCloseButton"
        >
          Close
        </button>
        <button
            @click="handleSave"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-sky-900"
        >
          Save
        </button>
        <transition-group name="fade">
            <ActionSpinnerAnimation key=1 v-if="showActionSpinner" data="Saving"/>
            <ActionModal key=2 v-if="showActionModal" data="Saved"/>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";

const store = useAuthStore();

const emits = defineEmits(['closeBtn'])

const showActionSpinner = ref(false);
const showActionModal = ref(false);
const errors = ref({})
const firstName = ref('')
const middleName = ref('')
const lastName = ref('')
const email = ref('')
const mobile = ref('')
const course = ref('')


const handleSave = async()=>{
   const data = {
    first_name: firstName.value,
    middle_name: middleName.value,
    last_name: lastName.value,
    mobile_number: mobile.value,
    course: course.value,
    email: email.value
   }
   await store.saveUserInfo(data)
}


const handleCloseButton = ()=>{
    emits('closeBtn')
}


const validateInputs = ()=>{

}

</script>

<style scoped></style>

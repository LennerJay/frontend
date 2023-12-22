<template>
    <div class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-40" v-if="modalStore.studentEditModal">
      <div class="relative p-5 bg-white md:max-w-[40rem] max-w-full mx-auto md:mt-40 mt-32 border-4 border-sky-950 rounded-xl max-h-[50rem] overflow-y-auto">
            <h1 class="text-[25px] font-bold"><span class="border-b-2 border-sky-900">Stu</span>dent Details</h1>
            <div class="flex flex-col mt-4">
                <div class="grid grid-cols-2 w-full h-full gap-4">
                    <div>
                        <label for="fname" class="font-bold">First Name</label>
                        <input type="text" placeholder="Enter Your First Name" class="capitalize border rounded w-full h-10 pl-2">
                    </div>
                    <div>
                        <label for="mname" class="font-bold">Middle Name</label>
                        <input type="text" placeholder="Middle Name" class="capitalize border rounded w-full h-10 pl-2">
                    </div>
                    <div>
                        <label for="lname" class="font-bold">Last Name</label>
                        <input type="text" placeholder="Last Name" class="capitalize border rounded w-full h-10 pl-2">
                    </div>
                    <div>
                        <label for="mobile_number" class="font-bold">Mobile Number</label>
                        <input type="text" placeholder="Mobile Number" class="capitalize border rounded w-full h-10 pl-2">
                    </div>
                    <div>
                        <label for="email" class="font-bold">Email</label>
                        <input type="email" placeholder="Email" class="capitalize border rounded w-full h-10 pl-2">
                    </div>
                    <div>
                        <label for="course" class="font-bold">Course</label>
                        <input type="text" placeholder="Course" class="capitalize border rounded w-full h-10 pl-2">
                    </div>
                </div>
            </div>
            <div class="flex justify-end mt-4 items-center gap-5">
                <button class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="modalStore.showStudentEditModal">
                    Close
                </button>
                <button class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-sky-900">
                    Save 
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { userModalStore } from '../stores/modalStore';

const modalStore = userModalStore();
</script>

<style scoped>
</style>
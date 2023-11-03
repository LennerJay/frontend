<template>
    <div class="content">
        <h1>Profile</h1>
        <div class="max-w-xs bg-white rounded-lg overflow-hidden shadow-md">
            <div class="p-4">
                <div class="text-center">
                    <img src="../../assets/user-icon.png" alt="Profile Picture" class="w-32 h-32 mx-auto rounded-full">
                </div>
                <div class="mt-4 text-center">
                    <h1 class="text-xl font-semibold">{{user.fullname}}</h1>
                    <p class="text-gray-600">Year: {{user.year}} Section: {{user.section}}</p>
                </div>
            </div>
            <div class="px-4 py-2 bg-gray-100">
                <ul>
                    <li class="flex items-center mb-2">
                        <i class="fas fa-graduation-cap text-gray-600 mr-2"></i>Course: {{user.course}}
                    </li>
                    <li class="flex items-center mb-2">
                        <i class="fas fa-mobile-alt text-gray-600 mr-2"></i>Mobile Number: {{user.mobile_number}}
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-envelope text-gray-600 mr-2"></i>Email: {{user.email}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useAuthStore } from '../../stores/auth';

const userStore = useAuthStore();
const user = userStore.user.info;

</script>
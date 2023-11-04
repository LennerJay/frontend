<template>
    <div class="content bg-sky-900 pl-1 h-full">
        <div class="header pl-2 pt-2 text-white">
            <div class="font-bold p-1 text-[30px]">Student Profile</div>
        </div>
        <div class="bg-stone-200 h-[42.9rem]">
            <div class="px-2 py-4 mt-16 flex flex-col justify-center items-center text-center pt-16">
                <img class="inline-flex object-cover border-4 border-sky-900 dark:border-sky-700 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-sky-800/100 dark:shadow-sky-900/100 bg-sky-50 dark:bg-sky-900 text-sky-800 dark:text-sky-800 h-24 w-24 !h-48 !w-48" src="../../assets/pic2.jpg" alt="Student Profile">
                <h1 class="text-2xl text-sky-800 font-bold mt-2">{{user.fullname}}
                    <p class="text-sm text-sky-900 mt-2">Year: {{user.year}} Section: {{user.section}}</p>
                </h1>
                <h2 class="text-base md:text-xl text-sky-800 font-bold">Course: {{user.course}}</h2>
                <ul class="flex flex-row mt-2">
                    <li class="mx-2 text-sky-900 hover:text-sky-600">
                        <a href="" target="_blank" aria-label="mobile_number">
                            <i class="fas fa-mobile-alt marker:mr-2 h-6 pr-2"></i>{{user.mobile_number}}
                        </a>
                    </li>
                    <li class="mx-2 text-sky-900 hover:text-sky-600">
                        <a href="" target="_blank" aria-label="email">
                            <i class="fas fa-envelope h-6 mr-2"></i>Email: {{user.email}}
                        </a>
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
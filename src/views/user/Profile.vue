<template>
    <div class="content">
        <h1>  Profile</h1>
        <div v-for="(value, key) in user.info" :key="key">
            {{ key}}: {{ value }}
        </div>
        


    </div>
</template>


<script setup>
import { useAuthStore } from '../../stores/auth';

const userStore = useAuthStore();

const user = userStore.user;


</script>
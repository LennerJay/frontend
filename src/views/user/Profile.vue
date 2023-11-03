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
import{ onMounted } from 'vue';

const userStore = useAuthStore();

const user = userStore.user;

onMounted(()=>{
    console.log(user);
})
</script>
<script setup>
import { RouterView } from 'vue-router'
  import SideBar from '@/components/SideBar.vue'
  // import { onMounted } from 'vue';
  // import { allInstructors } from './http/instructor-api';

  // onMounted(async ()=>{
  //   const {data} = await allInstructors();
  //   console.log(data);
  // });
</script>

<template>
  <header>
     <SideBar/>
  </header>
  <router-view/>
</template>


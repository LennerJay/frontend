<script setup>
import { RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue'

</script>

<template>
  <header>
     <SideBar/>
  </header>
  <router-view/>
</template>


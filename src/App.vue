<script setup>
import { RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue'

</script>

<template>
  <SideBar/>
  <router-view v-slot="{Component}">
    <Transition name="fade" mode="out-in">
      <component :is="Component"/>
    </Transition>
  </router-view>

</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

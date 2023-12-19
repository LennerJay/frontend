<script setup>
import { RouterView, useRoute } from "vue-router";
import { ref, watch } from "vue";
import SideBar from "@/components/SideBar.vue";

const route = useRoute();
const showSideBar = ref(false);

watch(route, (to) => {
  if (to.path == "/login" || to.path == "/about-us") {
    showSideBar.value = false;
  } else {
    showSideBar.value = true;
  }
});
</script>

<template>
    <Transition name="fade" mode="out-in">
      <SideBar v-if="showSideBar" />
    </Transition>
    <router-view  v-slot="{ Component,route }">
      <Transition  name="fade" mode="out-in">
         <div :key="route.fullPath">
          <component  :is="Component" />
         </div>
      </Transition>
    </router-view>

</template>
<style scoped>
body {
  display: flex;
}
main{
  will-change: transform, opacity;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import { RouterView, useRoute } from "vue-router";
import { ref, watch } from "vue";
import SideBar from "@/components/SideBar.vue";
import LoadingAnimation from "./components/LoadingAnimation.vue";

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
  <div class="flex font-poppins">
    <Transition name="fade" mode="out-in">
      <SideBar v-if="showSideBar" />
    </Transition>
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
    <!-- <router-view></router-view> -->
  </div>
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

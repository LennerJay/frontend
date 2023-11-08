<script setup>
import { RouterView,useRoute } from 'vue-router'
import { ref,watch} from 'vue';
import SideBar from '@/components/SideBar.vue'

const route = useRoute() 
const showSideBar = ref()


watch(
  route,
  (to)=>{
    if(to.path === '/login' || to.path === '/'){
      showSideBar.value = false
    }else{
      showSideBar.value = true
    }
    
  }

)
</script>

<template>
  <div class="flex">
    <SideBar v-if="showSideBar" />

    <router-view v-slot="{Component}">
      <Transition name="fade" mode="out-in">
        <component :is="Component"/>
      </Transition>
    </router-view>
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

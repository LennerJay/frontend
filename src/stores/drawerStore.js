import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', () => {
  const drawerState = ref(true)
  function toggle() {
    drawerState.value = !drawerState.value
  }

  return { drawerState, toggle }
})
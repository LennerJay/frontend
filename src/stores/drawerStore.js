import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawerStore', () => {
  const drawerState = ref(true)
  function toggle() {
    drawerState.value = !drawerState.value
  }

  return { drawerState, toggle }
})
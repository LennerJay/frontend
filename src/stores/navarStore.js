import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNavarStore = defineStore('navarStore', () => {
    const navarState = ref(false);
    function showNavar() {
        navarState.value = !navarState.value
    }
    return { navarState, showNavar }
});
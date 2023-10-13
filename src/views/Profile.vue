<template>
    <LoadingAnimation v-if="isLoading"/>
    <div class="md:ml-[250px] ml-0 bg-sky-900 font-serif px-2 w-full" v-else>
        <div class="header pl-2 pt-2 text-white">
            <div class="font-bold p-1 text-[30px]"><span class="inline-block md:hidden" @click="drawer.toggle"><i class="bi bi-filter-left px-5 p-1 bg-blue-700 rounded-md cursor-pointer"></i></span>Student Profile</div>
        </div>
        <StudentCard/>
    </div>
</template>
<script setup>
import { useDrawerStore } from "../stores/drawerStore"
import { onMounted ,ref} from 'vue'
import LoadingAnimation from '../components/LoadingAnimation.vue'
import StudentCard from '../components/StudentCard.vue'

const isLoading = ref(true)
const drawer = useDrawerStore()
const loadedData = () => {
    isLoading.value = false
}
onMounted(()=>{
    loadedData();
});
</script>
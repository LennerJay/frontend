<template>
    <div class="content">
       <div class="header">
            Cordova Public College
            <p>2023</p>
            <p>department </p>
            <Select></Select>
       </div>
    
       <div class="min-h-screen bg-blue-50">
            <div class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5">
                <ProfileCard v-for="instructor in instructors" :instructor="instructor"/>
            </div>
         </div>
    </div>
</template>


<script setup>
import { useInstructorStore } from "../stores/instructor"
import { onMounted ,ref} from 'vue'
import ProfileCard from "../components/ProfileCard.vue";
import Select from "../components/Select.vue";

const store = useInstructorStore()
const instructors = ref([]);
onMounted(async ()=>{
    await store.fetchAllInstructors();
    instructors.value = store.instructors
    
});
</script>



<style scoped>

</style>
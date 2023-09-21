<template>
    <div class="content">
       <div class="header">
            Cordova Public College
            <p>2023</p>
            <Select @selectValue="selectedValue"  :course="course" @option="option" :open="open"></Select>
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
import { onMounted ,ref,computed} from 'vue'
import ProfileCard from "../components/ProfileCard.vue";
import Select from "../components/Select.vue";


const store = useInstructorStore()
const instructors = ref([]);
let open = ref(false)
let course = ref('Course')

const selectedValue = (val)=>{
    instructors.value = store.filterDepartment(val)
    course.value= val
    open.value = false
}
const option = (val)=>{
    open.value = val
}

onMounted(async ()=>{
    await store.fetchAllInstructors();
    instructors.value = store.instructors
    
});
</script>



<style scoped>

</style>
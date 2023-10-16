<template>
    <div class="content">
       <div class="header">
            Cordova Public College
            <p>2023</p>
            <div ref="selectRef">
                <SelectTag  @selectValue="selectedValue"  :course="course" @option="option" :open="open" @closeTag="closeTag"></SelectTag>
            </div>
       </div>
    
       <div class="min-h-screen bg-blue-50">
            <div class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5">
                <ProfileCard v-for="instructor in instructors" :instructor="instructor" :key="instructor.id"/>
            </div>
         </div>
    </div>
</template>


<script setup>
import { useInstructorStore } from "../stores/instructor";
import { onMounted ,ref} from 'vue';
import ProfileCard from "@/components/ProfileCard.vue";
import SelectTag from "@/components/SelectTag.vue";



const store = useInstructorStore()
const selectRef = ref(null)
const instructors = ref([]);
let open = ref(false)
let course = ref('Course')

const handleSelectTag = (event)=>{
    if (selectRef.value == null) {
        return; // Exit early if event.target is null
    }
    if(!selectRef || !selectRef.value.contains(event.target)){
        open.value = false
    }
}
const selectedValue = (val)=>{
    instructors.value = store.filterDepartment(val)
    course.value= val
    open.value = false
}
const option = (val)=>{
    open.value = val
}
const closeTag= ()=>{
    open.value = false
}
onMounted(async ()=>{
    await store.fetchAllInstructors();
    instructors.value = store.instructors
    document.addEventListener('click', handleSelectTag);
 
});



</script>



<style scoped>

</style>
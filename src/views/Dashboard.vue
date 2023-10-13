<template>
    <LoadingAnimation v-if="isLoading"/>
    <div class="md:ml-[250px] ml-0 bg-sky-900 font-serif px-2 w-full" v-else>
       <div class="header pl-2 pt-2">
            <div class="font-bold text-white p-1 text-[30px]">
                <span class="inline-block md:hidden" @click="drawer.toggle"><i class="bi bi-filter-left px-5 p-1 bg-blue-700 rounded-md cursor-pointer"></i></span> Cordova Public College
            </div>
            <p class="text-white pb-1">2023</p> 
            <div ref="selectRef" class="text-zinc-500 flex">
                <SelectTag  @selectValue="selectedValue"  :course="course" @option="option" :open="open" @closeTag="closeTag"></SelectTag>
            </div>
       </div>
    
       <div class="min-h-screen bg-stone-200">
            <div class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5">
                <ProfileCard v-for="instructor in instructors" :instructor="instructor"/>
            </div>
         </div>
    </div>
    <!-- <div class="content">
       <div class="header">
            Cordova Public College
            <p>2023</p>
            <div ref="selectRef">
                <SelectTag  @selectValue="selectedValue"  :course="course" @option="option" :open="open" @closeTag="closeTag"></SelectTag>
            </div>
       </div>
    
       <div class="min-h-screen bg-blue-50">
            <div class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5">
                <ProfileCard v-for="instructor in instructors" :instructor="instructor"/>
            </div>
         </div>
    </div> -->
</template>


<script setup>
import { useInstructorStore } from "../stores/instructor";
import { useDrawerStore } from "../stores/drawerStore"
import { onMounted ,ref} from 'vue';
import ProfileCard from "../components/Profilecard.vue";
import SelectTag from "../components/SelectTag.vue";
import LoadingAnimation from '../components/LoadingAnimation.vue'



const store = useInstructorStore()
const drawer = useDrawerStore()
const isLoading = ref(true)
const selectRef = ref(null)
const instructors = ref([]);
let open = ref(false)
let course = ref('Course')

const loadedData = () => {
        isLoading.value = false
}

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
    loadedData();
});



</script>



<style scoped>

</style>
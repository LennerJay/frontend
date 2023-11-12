<template>
<<<<<<< HEAD
    <div class="md:ml-[250px] ml-0 bg-sky-950 font-Times New Roman px-0 w-full">
=======
    <div class="md:ml-[250px] ml-0 bg-sky-950 font-serif px-0 w-full">
>>>>>>> 3db9ce48db7d3f41293f099936f00646812a4f2f
        <div class="header pl-2 pt-2 text-white ml-5">
            <div class="font-bold p-1 text-[30px]">
              <span class="inline-block md:hidden" @click="drawer.toggle">
                <i class="bi bi-filter-left px-5 p-1 bg-blue-800 rounded-md cursor-pointer"></i>
              </span>
                Cordova Public College
                <p class="text-lg">2023</p>
            </div>
            <div ref="selectRef" class="text-zinc-500 flex mr-5">
                <SelectTag  @selectValue="selectedValue"  :course="department" @show="show" :open="open" @closeTag="closeTag" :option="'departments'"></SelectTag>
            </div>
       </div>    
       <div class="min-h-screen bg-blue-50">
            <div class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5">
                <ProfileCard v-for="evaluatee in evaluatees" :evaluatee="evaluatee" :key="evaluatee.id"/>
            </div>
        </div>
        <FooterCard/>
    </div>
</template>


<script setup>
import { useEvaluateeStore } from "../../stores/evaluatee";
import { onMounted ,ref } from 'vue';
import ProfileCard from "@/components/ProfileCard.vue";
import SelectTag from "@/components/SelectTag.vue";
import FooterCard from "@/components/FooterCard.vue"
import { useDrawerStore } from '../../stores/drawerStore';


const drawer = useDrawerStore()
const store = useEvaluateeStore()
const selectRef = ref(null)
const  evaluatees = ref([]);
let open = ref(false)
let department = ref('All Departments')

const handleSelectTag = (event)=>{
    if (selectRef.value == null) {
        return; // Exit early if event.target is null
    }
    if(!selectRef || !selectRef.value.contains(event.target)){
        open.value = false
    }

}
const selectedValue = (val)=>{
    if(val === 'allDepartments'){
        evaluatees.value = store.allEvaluatees
        department.value= 'All Departments'
    }else{
        evaluatees.value =  store.filterDepartment(val)
        department.value= val
 
    }
    open.value = false

}
const show = (val)=>{
    open.value = val
}
const closeTag= ()=>{
    open.value = false
}
onMounted(async ()=>{
    if(!localStorage.getItem('allEvaluatees')){
        await store.fetchAllEvaluatees()
    }
    evaluatees.value = store.allEvaluatees
    document.addEventListener('click', handleSelectTag);
 
});


</script>



<style scoped>

</style>
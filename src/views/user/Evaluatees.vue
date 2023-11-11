<template>
    <div class="md:ml-[250px] ml-0  font-serif px-0 w-full">
       <div class="header">
            <h1>Cordova Public College</h1>
            <p class="school-year">SY: 2023-2024</p>
       </div>

       <div class="selectRef-main-container">
            <div ref="selectRef" class="select-container">
                <SelectTag  @selectValue="selectedValue"  :course="department" @show="show" :open="open" @closeTag="closeTag" :option="'departments'" class="department-selection"></SelectTag>
            </div>
       </div>
    
       <div class="min-h-screen bg-blue-50">
            <div class="grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5">
                <ProfileCard v-for="evaluatee in evaluatees" :evaluatee="evaluatee" :key="evaluatee.id"/>
            </div>
         </div>
    </div>
</template>


<script setup>
import { useEvaluateeStore } from "../../stores/evaluatee";
import { onMounted ,ref } from 'vue';
import ProfileCard from "@/components/ProfileCard.vue";
import SelectTag from "@/components/SelectTag.vue";



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

    .header {
        background-color: #0C4A6E;
        padding: 25px 15px;
        color: #ffffff;
        font-family: Helvetica, Georgia, "Times New Roman";
        text-align: center;
    }

    .header h1 {
        font-size: 25px;
        font-weight: bold;
    }

    .school-year {
        font-size: 18px;
        font-style: italic
    }

    .selectRef-main-container {
        width: 100%;
        margin: auto;
    }

    .select-container {
        background-color: #ffffff;
        padding: 10px 15px;
        width: 30.8%;
    }

    .department-selection {
        font-family: Helvetica, Georgia, "Times New Roman";
        font-size: 15px;
    }

</style>
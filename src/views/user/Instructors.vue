<template>
    <div class="content">
       <div class="header">
            Cordova Public College
            <p>2023</p>
            <div ref="selectRef">
                <SelectTag   @selectValue="selectedValue"  :course="department" @option="option" :open="open" @closeTag="closeTag"></SelectTag>
            </div>
       </div>
    
       <div class="min-h-screen bg-blue-50">
            <div class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5">
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
let department = ref('Department')

const handleSelectTag = (event)=>{
    if (selectRef.value == null) {
        return; // Exit early if event.target is null
    }
    if(!selectRef || !selectRef.value.contains(event.target)){
        open.value = false
    }

}
const selectedValue = (val)=>{
    evaluatees.value =  store.filterDepartment(val)
   department.value= val
    open.value = false
}
const option = (val)=>{
    open.value = val
}
const closeTag= ()=>{
    open.value = false
}
onMounted(async ()=>{
    if(!localStorage.getItem('evaluatees')){
        await store.fetchAllEvaluatees()
    }
     evaluatees.value = store.evaluatees
    console.log( evaluatees.value)
    document.addEventListener('click', handleSelectTag);
 
});



</script>



<style scoped>

</style>
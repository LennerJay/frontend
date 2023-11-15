<template>
   
    <div class="md:ml-[250px] ml-0 bg-sky-950 font-Times New Roman px-0 w-full">
        <LoadingAnimation v-if="isLoaded" class="loading-screen"/>
        <div class="header pl-2 pt-2 text-white ml-5">
            <div class="font-bold p-1 text-[30px]">
              <span class="inline-block md:hidden" @click="drawer.toggle">
                <i class="bi bi-filter-left px-5 p-1 bg-blue-800 rounded-md cursor-pointer"></i>
              </span>
                Cordova Public CollegeX
                <p class="text-lg">2023</p>
            </div>
            <div ref="selectRef" class="text-zinc-500 flex mr-5">
                <SelectTag class="select-dropdown"  @selectValue="selectedValue"  :course="department" @show="show" :open="open" @closeTag="closeTag" :option="'departments'"></SelectTag>
            </div>
       </div>    
       <div class="min-h-screen bg-blue-50">
            <div v-if="showEvaluatee">
                <div class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5">
                    <ProfileCard class="card-box" v-for="evaluatee in evaluatees" :evaluatee="evaluatee" :key="evaluatee.id" option="View" @selectedEvaluatee="selectedEvaluatee"/>
                </div>
                <ModalCard :showModal="showModal" 
                        :showDetail ="showDetail"
                        :evaluateeInfo="evaluateeInfo"
                        @close-modal="closeModal"
                        class="modal-box"/>
            </div>
            <div v-else>
            Loading Data
            </div>
     
        </div>

        <FooterCard/>
    </div>
</template>


<script setup>
import { useEvaluateeStore } from "../../stores/evaluatee";
import { onMounted ,ref } from 'vue';
import { useDrawerStore } from '../../stores/drawerStore';
import ProfileCard from "@/components/ProfileCard.vue";
import SelectTag from "@/components/SelectTag.vue";
import FooterCard from "@/components/FooterCard.vue"
import ModalCard from '../../components/ModalCard.vue';
import LoadingAnimation from '../../components/LoadingAnimation.vue'

const drawer = useDrawerStore()
const store = useEvaluateeStore()
const selectRef = ref(null)
const  evaluatees = ref([]);
let open = ref(false)
let department = ref('All Departments')
const showModal = ref(false)
const showDetail = ref(false)
const evaluateeInfo = ref([]);
const showEvaluatee = ref(false);
const isLoaded = ref(true);

const loadedData = () => {
    isLoaded.value = false
    // setTimeout(() => {
    //     isLoaded.value = false
    // }, 2000); 
}

const closeModal = ()=>{
    showModal.value = false
    showDetail.value = false
}
const selectedEvaluatee  = async(id) =>{
    showModal.value = true
    evaluateeInfo.value =  await store.fetchEvaluateeInfo(id)
    console.log(evaluateeInfo.value )
    showDetail.value = true
    console.log(id)
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
        showEvaluatee.value = true
    }
    evaluatees.value = store.allEvaluatees
    showEvaluatee.value = true
    document.addEventListener('click', handleSelectTag);
    loadedData();
});

</script>

<style scoped>
.select-dropdown {
  z-index: 999;
}
.card-box {
  z-index: 1;
}
.modal-box {
  z-index: 1000
}
.loading-screen {
    z-index: 1000;
}
</style>
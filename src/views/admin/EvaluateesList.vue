<template>
    <div class="content">
        <h1 class="font-bold">Evaluatee List</h1>
        <div class="flex items-center justify-between mb-4 mt-10">
            <div class="flex items-center">
                <label for="search" class="block text-gray-700 pl-2">Search:</label>
                <input type="text" id="search" class="w-full p-2 border border-gray-300 rounded-md" v-model="searchBar">
            </div>
            <div class="flex">
                <div ref="selectRef" class="text-zinc-500 flex mr-5">
                    <SelectTag  class="select-dropdown"  @selectValue="selectedValue"  :course="department" @show="show" :open="open" @closeTag="closeTag" :option="'departments'"></SelectTag>
                </div>
                <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Create Evaluatee</button>
            </div>
        </div>
        <TableForm  :data="filteredEvaluatees" :isNoData="isNoData" @deleteClick="handleDelete"></TableForm>
    </div>
</template>

<script setup>
import { useEvaluateeStore } from '../../stores/evaluatee';
import { ref , onMounted,computed} from 'vue';
import TableForm from '../../components/TableForm.vue';
import SelectTag from '../../components/SelectTag.vue';

const searchBar = ref('');
const evaluateStore = useEvaluateeStore();
const evaluatees = ref();
const isNoData = ref(true);
let open = ref(false)
let department = ref('All departments')
const selectRef = ref(null)

const filteredEvaluatees = computed(()=>{
    if(!searchBar.value){
        return evaluatees.value;
    }

    return evaluatees.value.filter(data => data.name.toLowerCase().includes(searchBar.value.toLowerCase()));
})
const handleDelete = async(id)=>{
    await evaluateStore.removeEvaluate(id);
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
        department.value= 'All Departments'
        evaluatees.value = evaluateStore.allEvaluatees
    }else{
        department.value= val
        evaluatees.value = evaluateStore.filterDepartment(val)
    }
    open.value = false

}

const show = (val)=>{
    open.value = val
}

const closeTag= ()=>{
    open.value = false
}


onMounted(async()=>{
    document.addEventListener('click', handleSelectTag);
    await evaluateStore.fetchAllEvaluatees()
    if(evaluateStore.errors.length == 0){
        evaluatees.value = evaluateStore.allEvaluatees;
        isNoData.value = false
    }

})

</script>

<style lang="scss" scoped>

</style>
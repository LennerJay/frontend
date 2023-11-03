<template>
    <div class="content">
        <div>Instructors List</div>
        <div ref="selectRef">
        <SelectTag  @selectValue="selectedValue"  :course="list" @show="show" :open="open" @closeTag="closeTag" :option="'departments'"></SelectTag>
       
       </div>
    </div>
</template>

<script setup>
import { ref , onMounted} from 'vue';
import SelectTag from '../../components/SelectTag.vue';


const users = ref([]);
let open = ref(false)
let list = ref('departments')
const selectRef = ref(null)
const handleSelectTag = (event)=>{
    if (selectRef.value == null) {
        return; // Exit early if event.target is null
    }
    if(!selectRef || !selectRef.value.contains(event.target)){
        open.value = false
    }

}
const selectedValue = (val)=>{
    list.value= val
    open.value = false
}
const show = (val)=>{
    open.value = val
}
const closeTag= ()=>{
    open.value = false
}


onMounted(()=>{
    document.addEventListener('click', handleSelectTag);

})
</script>

<style lang="scss" scoped>

</style>
<template>
    <div class="content">
        <h1 class="font-bold">User List</h1>
        <div class="flex items-center justify-between mb-4 mt-10">
            <div class="flex items-center">
                <label for="search" class="block text-gray-700 pl-2">Search:</label>
                <input type="text" id="search" class="w-full p-2 border border-gray-300 rounded-md" v-model="searchBar">
            </div>
            <div class="flex gap-4">
                
                <div ref="selectRef1" class="text-zinc-500 flex mr-5">
                    <SelectTag class="select-dropdown"  @selectValue="selectedValue"  :course="department" @show="show" :open="open" @closeTag="closeTag" :option="'departments'"></SelectTag>
                </div>
                <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Create User</button>
            </div>
        </div>
        <TableForm :data="filteredUsers"  :isNodata="isNoData"></TableForm>
    </div>
</template>

<script setup>
import { useUserStore } from '../../stores/users'
import { ref, onMounted, computed } from 'vue';
import SelectTag from '../../components/SelectTag.vue';
import TableForm from '../../components/TableForm.vue';

const userStore = useUserStore();


const searchBar = ref('');
const users = ref([]);
let open = ref(false)
let department = ref('All Departments')
let role = ref('Roles')
const keys = ref([])
const selectRef = ref(null)
const selectRef1 = ref(null)
const isNoData = ref(true);
const filteredUsers = computed(()=>{
    if(!searchBar.value){
        return users.value;
    }
})


const handleDelete = async(id)=>{
   
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
    users.value = userStore.filterUsers(val)
    console.log(users.value)
    list.value= val
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
    await userStore.fetchAllUsers();
    users.value = userStore.users
    console.log(users.value)
    // keys.value = Object.keys(users.value[0].info)

})
</script>

<template>
    <div class="content">
       <div> User List </div>

       <div ref="selectRef">
        <SelectTag  @selectValue="selectedValue"  :course="list" @show="show" :open="open" @closeTag="closeTag" :option="'roles'"></SelectTag>
       
       </div>

       <!-- <div v-for="user in users">
        {{ user.roles[0].name }}
       </div> -->
       <table class="mt-2 border-collapse border border-slate-400">
         <thead >
            <tr>
                <th class="border-2 mt-2" v-for="key in keys">{{key}}</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="user in users">
                <td v-for="info in user.info">{{ info }}</td>
            </tr>
         </tbody>

       </table>
    </div>
</template>

<script setup>
import { useUserStore } from '../../stores/users'
import { useAuthStore } from '../../stores/auth';
import { ref , onMounted} from 'vue';
import SelectTag from '../../components/SelectTag.vue';
// import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const userStore = useUserStore();
// const { users } = storeToRefs(userStore);
const users = ref([]);
let open = ref(false)
let list = ref('Students')
const keys = ref([])
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
    await userStore.fetchUsers();
    users.value = userStore.filterUsers('student')
    console.log(users.value)
    keys.value = Object.keys(users.value[0].info)
    authStore.fetchUser();
    console.log(authStore.user)
})
</script>

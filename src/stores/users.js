import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllUsers } from "../http/users-api";

export const useUserStore = defineStore('userStore', ()=>{
    const users = ref([])
    const errors = ref([]);

    const fetchAllUsers = async ()=>{
        try{
            const {data}  = await getAllUsers();
            users.value =  data
            errors.value = []
        }catch(error){
            users.value = []
            errors.value =  error.response
        }
    }

    const filterUsers = (value) =>{
        return users.value.filter((user)=>{
            return user.roles.some(role => role.name === value)
        })
    }

    return{
        users,
        errors,
        fetchAllUsers,
        filterUsers
    }
});
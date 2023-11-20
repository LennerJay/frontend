import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllUsers } from "../http/users-api";

export const useUserStore = defineStore('userStore', ()=>{
    const users = ref([]);
    const errors = ref([]);
    const filteredUsers = ref([]);
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

    const filterUsers = (role,department,sectionYear) =>{
        filteredUsers.value = users.value.filter(user =>user.roles[0].name == role);

        if(department !== "All"){
            filteredUsers.value = filteredUsers.value.filter(user => user.departments[0].department == department);
        }
        if(sectionYear  !== "All"){
            filteredUsers.value =  filteredUsers.value.filter(user => user.year_sections[0].year_section == sectionYear);
        }
        return filteredUsers.value;
        // return {
        //     role:role,
        //     department:department,
        //     sectionYear:sectionYear
        // }
    }

    return{
        users,
        errors,
        fetchAllUsers,
        filterUsers
    }
});
import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllUsers, deleteUser ,fetchUserInfo,resetPassword,storeUserInfo,deleteUserInfo, addUsers} from "../http/users-api";
import { csrfCookie } from "../http/auth-api";

export const useUserStore = defineStore('userStore', ()=>{
    const users = ref([]);
    const userInfo = ref([]);
    const errors = ref([]);
    const isSuccess = ref(false)
    const filteredUsers = ref([]);

    const fetchAllUsers = async ()=>{
        try{
            const {data}  = await getAllUsers();
            if(data.success){
                isSuccess.value = true;
                users.value = data.data
           
            }else{
                isSuccess.value = false;
            }
            errors.value = []
        }catch(error){
            users.value = []
            isSuccess.value = false;
            errors.value =  error.response
        }
    }

    const filterUsers = (role,department,sectionYear) =>{
        filteredUsers.value = users.value.filter(user =>user.role_name == role);
        if(department !== "All"){
            filteredUsers.value = filteredUsers.value.filter(user => user.departments.includes(department));
        }
        if(sectionYear  !== "All"){
            filteredUsers.value =  filteredUsers.value.filter(user => user.year_section.includes(sectionYear));
        }
        return filteredUsers.value;
    }

    const showUserDetails = async (id)=>{
            await csrfCookie()
        try {
            const {data} = await fetchUserInfo({id_number:id})
            if(data.success){
                isSuccess.value = true
                userInfo.value = data.data
            }else{
                isSuccess.value = false
            }
            errors.value = []
        } catch (error) {
            errors.value = error
            isSuccess.value = false
        }
    }

    const removeUser = async(id)=>{
       await csrfCookie()
        try {
            const {data} = await deleteUser(id)
            if(data.success){
                isSuccess.value = true
                users.value = users.value.filter(user => user.id_number != id)
            }else{
                isSuccess.value = false
            }
            errors.value = []
        } catch (error) {
            errors.value = error
            isSuccess.value = false
        } 
    }

    const removeUserInfo = async(id)=>{
       await csrfCookie()
        try {
            const {data} = await deleteUserInfo(id)
            if(data.success){
                isSuccess.value = true
            }else{
                isSuccess.value = false
            }
            errors.value = []
        } catch (error) {
            errors.value = error
            isSuccess.value = false
        } 
    }

    const createUpdateUserInfo = async(val)=>{
        await csrfCookie()
         try {
             const {data} = await storeUserInfo(val)
             if(data.success){
                 isSuccess.value = true
             }else{
                 isSuccess.value = false
             }
             errors.value = []
         } catch (error) {
             errors.value = error
             isSuccess.value = false
         } 
     }


    const updatePassword =async(id)=>{
        await csrfCookie()
        try {
            const {data} = await resetPassword(id)
            console.log(data)
            if(data.success){
                isSuccess.value = true
            }else{
                isSuccess.value = false
            }
            errors.value = []
        } catch (error) {
            errors.value = error
            isSuccess.value = false
        } 
    }

    const saveUsers = async(val)=>{
        await csrfCookie()
        try {
            const {data} = await addUsers(val)
            console.log(data)
            if(data.success){
                isSuccess.value = true
               
            }else{
                isSuccess.value = false
            }
            errors.value = []
        } catch (error) {
            errors.value = error
            isSuccess.value = false
        } 
    }


    return{
        saveUsers,
        createUpdateUserInfo,
        removeUserInfo,
        updatePassword,
        showUserDetails,
        users,
        errors,
        fetchAllUsers,
        filterUsers,
        isSuccess,
        removeUser,
        userInfo
    }
});
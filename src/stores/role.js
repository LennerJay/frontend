import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllRoles } from "../http/role-api"

export const useRoleStore = defineStore('roleStore',() =>{
    const errors = ref({});
    const roles = ref([]);

    const fetchAllRoles = async () => {
        try{
            const {data} = await getAllRoles();
            roles.value = data
        }catch(error){
            roles.value = null;
            errors.value = error.response
        }
    }


    return{
            roles ,fetchAllRoles
        }

});
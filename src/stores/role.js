import { defineStore } from "pinia";
import { ref ,watch} from "vue";
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

    if(localStorage.getItem('roles')){
        roles.value = JSON.parse(localStorage.getItem('roles'));
    }


    watch(
        roles,
        function(rolesVal){
            localStorage.setItem('roles', JSON.stringify(rolesVal));
        },
        {
            deep: true,
        }
    )


    return{
            roles ,fetchAllRoles
        }

});
import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllDepartments } from "../http/department-api"


export const useDepartmentStore = defineStore('departmentStore',() =>{

    const departments = ref([]);
    const errors = ref({});
    const getDepartments = async () =>{
        try{
            const {data}  = await getAllDepartments();
            departments.value =  data
        }catch(error){
            departments.value = null
            errors.value =  error.response
        }
    };


    return {
        getDepartments, departments
    }
});
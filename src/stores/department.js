import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllDepartments } from "../http/department-api"


export const useDepartmentStore = defineStore('departmentStore',() =>{

    const departments = ref([]);

    const getDepartments = async () =>{
        const { data } = await getAllDepartments();
        departments.value = data
    };


    return {
        getDepartments, departments
    }
});
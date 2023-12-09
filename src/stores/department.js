import { defineStore } from "pinia";
import { ref ,watch} from "vue";
import { getAllDepartments } from "../http/department-api"


export const useDepartmentStore = defineStore('departmentStore',() =>{

    const departments = ref([]);
    const errors = ref([]);
    const getDepartments = async () =>{
        try{
            const {data}  = await getAllDepartments();
            departments.value =  data.data
        }catch(error){
            departments.value = null
            errors.value =  error.response
        }
    };

    if(localStorage.getItem('departments')){
        departments.value = JSON.parse(localStorage.getItem('departments'))
    }

    watch(
        departments,
        (departmentsVal)=>{
            localStorage.setItem('departments',JSON.stringify(departmentsVal));
        },
        {
            deep:true
        }
    );


    return {
        getDepartments, departments
    }
});
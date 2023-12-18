import { defineStore } from "pinia";
import { ref ,watch} from "vue";
import { getAllDepartments,addDepartment, deleteDepartment, updateDepartment } from "../http/department-api"
import { csrfCookie } from "../http/auth-api"

export const useDepartmentStore = defineStore('departmentStore',() =>{

    const departments = ref([]);
    const errors = ref([]);
    const isSuccess = ref(false);
    const isResponseSuccess = ref(false)

    const getDepartments = async () =>{
        try{
            const {data}  = await getAllDepartments();
            if(data.success){
                isSuccess.value= true
                departments.value =  data.data
            }else{
                departments.value =[]
                isSuccess.value= false
            }
          
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

    const saveDepartment = async(val)=>{
        await csrfCookie()
        try{
            const {data} = await addDepartment({name: val});
            if(data.success){
                if(data.data){
                    isResponseSuccess.value = true;
                    isSuccess.value = true;
                    departments.value.unshift(data.data)
                }else{
                    isSuccess.value = false;
                    isResponseSuccess.value = false;
                }
            }
            errors.value = []
        }catch(e){
            errors.value = e
            isSuccess.value =false
        }
    }

    const saveUpdateDepartment = async(id,val)=>{
        await csrfCookie()
        try{
            const {data} = await updateDepartment(id,{name:val});
            if(data.success){
                if(data.data){
                    isResponseSuccess.value = true;
                    isSuccess.value = true;
                    departments.value =   departments.value.map(department => {
                        if(department.id == id){
                            department.name = val
                        }
                        return department
                    })
                }else{
                    isSuccess.value = false;
                    isResponseSuccess.value = false;
                }
            }
            errors.value = []
        }catch(e){
            errors.value = e
            isSuccess.value =false
        }
    }

    const removeDepartment = async(id)=>{
        await csrfCookie()
        try{
            const {data} = await deleteDepartment(id)
            if(data.success){
                isResponseSuccess.value = true;
                isSuccess.value = true;
                departments.value = departments.value.filter(department => department.id != id)
            }else{
                isResponseSuccess.value = false;
                isSuccess.value = false;
            }
            errors.value = []
        }catch(e){
            errors.value = e
            isSuccess.value =false
        }
    }




    return {
        getDepartments,
         departments, 
         saveDepartment,
         saveUpdateDepartment
         ,removeDepartment,
         isResponseSuccess,
         isSuccess
    }
});
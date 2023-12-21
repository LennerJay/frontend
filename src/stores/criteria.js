import { defineStore } from 'pinia'
import {getAllCriteria,addCriteria, deleteCriteria,updateCriteria} from '../http/criteria-api'
import { csrfCookie } from '../http/auth-api'
import {ref } from 'vue'

export const useCriteriaStore = defineStore('criteriaStore',()=>{
    const criterias = ref([])
    const isSuccess = ref([])
    const errors = ref([])


    const fetchAllCriteria = async()=>{
        try {
            const {data} = await getAllCriteria()
            if(data.success){
                criterias.value = data.data
                isSuccess.value = true
            }else{
                isSuccess.value = false
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }

    const saveCriteria = async(val)=>{
        await csrfCookie()
        try {
            const {data} = await addCriteria({description:val})
            if(data.success){
                isSuccess.value = true
                criterias.value.unshift(data.data)
            }else{
                isSuccess.value = false
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }

    const removeCriteria = async (id)=>{
        await csrfCookie()
        try {
            const {data} = await deleteCriteria(id)
            if(data.success){
                isSuccess.value = true
                criterias.value = criterias.value.filter(c => c.id != id)
            }else{
                isSuccess.value = false
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }

    const saveUpdateCriteria = async(id,val)=>{
        
        try {
            const {data} = await updateCriteria(id,{description:val});
            if(data.success){
                isSuccess.value = true
                criterias.value.unshift(data.data)
            }else{
                isSuccess.value = false
            }
        } catch (error) {
            
        }
    }


    return{
        saveUpdateCriteria,
        removeCriteria,
        saveCriteria,
        fetchAllCriteria,
        criterias,
        isSuccess,
        errors
    }
})
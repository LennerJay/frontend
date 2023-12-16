import { defineStore } from 'pinia';
import {addClass, deleteClass,updateClass } from "../http/class-api"
import {csrfCookie} from "../http/auth-api"
import { ref } from 'vue';

export const useClassStore = defineStore('classStore',()=>{
    const isSuccess = ref(false);
    const errors = ref([])
    const klasses = ref([])

    const saveClass = async(datas)=>{
        await csrfCookie()
        const {data} = await addClass(datas);
        if(data.success){
            isSuccess.value = data.success
            klasses.value = data.data
            errors.value = []
        }else{
            errors.value = data.message
        }
    }

    const editClass= async(val)=>{
        await csrfCookie()
        const {data} = await updateClass(val)
        if(data.success){
            isSuccess.value = data.success
            klasses.value = data.data
            errors.value = []
        }else{
            errors.value = data.message
        }
    }

    const removeClass = async(id)=>{
        await csrfCookie()
        const {data} = await deleteClass({klass_id : id,})
        if(data.success){
            isSuccess.value = data.success
            errors.value = []
        }else{
            errors.value = data.message
            isSuccess.value = false
        }
    };


    return {
        isSuccess,
        errors,
        saveClass,
        editClass,
        removeClass,
        klasses
    }
});
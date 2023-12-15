import { defineStore } from 'pinia';
import {addClass, deleteClass } from "../http/class-api"
import { ref } from 'vue';

export const useClassStore = defineStore('classStore',()=>{
    const isSuccess = ref(false);
    const errors = ref([])


    const saveClass = async(datas)=>{
        const {data} = await addClass(datas);
        console.log(data);
        if(data.success){
            isSuccess.value = data.success
            errors.value = []
        }else{
            errors.value = data.message
        }
    }

    const removeClass = async()=>{
        const {data} = await deleteClass()
    };


    return {
        isSuccess,
        errors,
        saveClass,
        removeClass
    }
});
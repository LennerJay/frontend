import { defineStore } from 'pinia';
import {addClass, updateClass, deleteClass } from "../http/class-api"
import { ref } from 'vue';

export const useClassStore = defineStore('classStore',()=>{
    const isSuccess = ref(false);
    const errors = ref([])


    const addClass = async()=>{

    }

    const updateClass = async()=>{

    }

    const deleteClass = async()=>{

    };


    return {
        isSuccess,
        errors,
        addClass,
        updateClass,
        deleteClass

    }
});
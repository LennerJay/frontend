import {  defineStore } from "pinia";



export const useLocalStorageStore = defineStore('localStorageStore',()=>{
    const questionRated = {};


    const setquestionRated = (value)=> questionRated.push(value);

    
    return{
        questionRated,setquestionRated
    }
});
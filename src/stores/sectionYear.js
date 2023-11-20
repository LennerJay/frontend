import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllSectionYear } from "../http/section-year-api";


export const useSectionYearStore = defineStore('sectionYearStore',()=>{
    const sectionYears = ref() 


    const fetchAllSectionYears = async()=>{
        const {data} = await getAllSectionYear();
        sectionYears.value = data
    }
    return {
        sectionYears,
        fetchAllSectionYears
    }
});
import { defineStore } from "pinia";
import { ref ,watch} from "vue";
import { getAllSectionYear } from "../http/section-year-api";


export const useSectionYearStore = defineStore('sectionYearStore',()=>{
    const sectionYears = ref([]) 


    const fetchAllSectionYears = async()=>{
        const {data} = await getAllSectionYear();
        sectionYears.value = data
    }

    if(localStorage.getItem('sectionYears')){
        sectionYears.value = JSON.parse(localStorage.getItem('sectionYears'))
    }


    watch(
        sectionYears,
        function(sectionYearsVal){
            localStorage.setItem('sectionYears', JSON.stringify(sectionYearsVal))
        },
        {
            deep: true,
        }
    );



    return {
        sectionYears,
        fetchAllSectionYears
    }
});
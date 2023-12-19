import { defineStore } from "pinia";
import { ref ,watch} from "vue";
import { getAllSectionYear, addSectionYear,removeSectionYear,updateSectionYear } from "../http/section-year-api";
import { csrfCookie } from "../http/auth-api"

export const useSectionYearStore = defineStore('sectionYearStore',()=>{
    const sectionYears = ref([]) 
    const errors = ref([]);
    const isSuccess = ref(false);
    const isResponseSuccess = ref(false);
  
    const fetchAllSectionYears = async()=>{

        try{
            const {data} = await getAllSectionYear();
            if(data.success){
                sectionYears.value = data.data
                  isSuccess.value = true;
                  isResponseSuccess = true;
            }else{
                isSuccess.value = false;
                isResponseSuccess = false;
            }
            errors.value = []
        }catch(e){
            errors.value = e;
        }
        
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


    const saveSectionYears = async(val)=>{
        await csrfCookie();
        try{
            const {data} = await addSectionYear({s_y:val});
            if(data.success){
                errors.value = []
                if(data.data){
                    isSuccess.value = true;
                    isResponseSuccess.value = true
                    sectionYears.value.push(data.data)
                }else{
                    isSuccess.value = false;
                    isResponseSuccess.value = false
                }
            }else{
                errors.value = data.message
            }
           
        }catch(e){
            errors.value = e;
            isSuccess.value = false;
          
        }
    }

    const saveUpdateSectionYears =async(id,val)=>{
        await csrfCookie();
        try{
            const {data} = await getAllSectionYear(id,{s_y:val});
            if(data.success){
                errors.value = []
                if(data.data){
                    isSuccess.value = true;
                    isResponseSuccess.value = true
                   
                }else{
                    isSuccess.value = false;
                    isResponseSuccess.value = false
                }
            }else{
                errors.value = data.message
            }
           
        }catch(e){
            errors.value = e;
            isSuccess.value = false;
          
        }
    }

    const deleteSectionYears = async(id)=>{
        await csrfCookie();
        try{
            const {data} = await getAllSectionYear(id);
            if(data.success){
                errors.value = []
                if(data.data){
                    isSuccess.value = true;
                    isResponseSuccess.value = true
                    sectionYears.value = sectionYears.value.filter(sy => sy.id !== id)
                }else{
                    isSuccess.value = false;
                    isResponseSuccess.value = false
                }
            }else{
                errors.value = data.message
            }
           
        }catch(e){
            errors.value = e;
            isSuccess.value = false;
          
        }
    }

    const filterSectionYear = ()=>{
        const secYe = sectionYears.value.map((item) => {
            return { id: item.id, name: item.year_section };
          });
    
        let datas = [];


        for(const sy of secYe){
            datas.push(sy.name)
          }
          const result = [];

          for (const section of datas) {
            const year = parseInt(section.split('-')[0]);
            const sectionName = section.split('-')[1];
    
            const existingGrade = result.find(item => item.year === year);
    
            if (existingGrade) {
              existingGrade.sections.push(sectionName);
            } else {
              result.push({ year, sections: [sectionName] });
            }
          }
    
          // Sort grades
          result.sort((a, b) => a.year - b.year);
    
          // Sort sections within each grade
          result.forEach(item => {
            item.sections.sort();
          });
    
          return result;
    }

    return {
        sectionYears,
        fetchAllSectionYears,
        errors,
        isSuccess,
        isResponseSuccess,
        saveSectionYears,
        saveUpdateSectionYears,
        deleteSectionYears,
        filterSectionYear
    }
});
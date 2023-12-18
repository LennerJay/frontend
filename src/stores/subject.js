import { defineStore } from "pinia";
import { ref ,watch} from "vue";
import { getAllSubjects ,saveSubjects, updateSubject, deleteSubject} from "../http/subject-api"
import { csrfCookie} from "../http/auth-api"

export const useSubjectStore = defineStore('subjectStore',()=>{
    const subjects = ref([])
    const isSuccess = ref(false)
    const isResponseSuccess = ref(false)
    const errors = ref([])

    if(localStorage.getItem('subjects')){
        subjects.value = JSON.parse(localStorage.getItem('subjects'))
    }
    watch(
        subjects,
        function(subjectVal){
            localStorage.setItem('subjects', JSON.stringify(subjectVal))
        },
        {
            deep: true,
        }
    )
    const fetchAllSubjects = async()=>{
        try {
            const { data } = await getAllSubjects()
            if(data.success){
                isSuccess.value = true
                subjects.value = data.data
            }else{
                isSuccess.value = false
            }
        } catch (error) {
            errors.value = error
        }
       
    }

    const addSubject = async(val)=>{
        await csrfCookie()
       try {
        const {data} =  await saveSubjects({name:val})
            if(data.success) {
                if(data.data){
                    isResponseSuccess.value = true
                    isSuccess.value= true
                    subjects.value.unshift(data.data)
                }else{
                    isSuccess.value= false
                    isResponseSuccess.value = false
                }
            }
        errors.value = []
       } catch (error) {
            errors.value = error
       }
    }

    const saveUpdateSubject = async(id,val)=>{
        await csrfCookie()
        try {
            const {data} = await updateSubject(id,{name:val})
            if(data.success){
                if(data.data){
                    isResponseSuccess.value = true
                    isSuccess.value= true
                    subjects.value = subjects.value.map(subject => {
                        if(subject.id == id){
                            subject.name = val
                        }
                        return subject
                    })
                }else{
                    isResponseSuccess.value = false
                    isSuccess.value = false
                }
            }
        } catch (error) {
             errors.value = error
        }
    }

    const removeSubject = async(id)=>{
        await csrfCookie()
      
        try {
            const {data} =  await deleteSubject(id)
            if(data.success){
                isResponseSuccess.value = true
                isSuccess.value= true
                subjects.value = subjects.value.filter(subjects => subjects.id != id)
            }else{
                isResponseSuccess.value = false
                isSuccess.value = false
            }
            errors.value = []
        } catch (error) {
             errors.value = error
        }
    }


    return {
        subjects,
        fetchAllSubjects,
        addSubject,
        saveUpdateSubject,
        removeSubject,
        isSuccess,
        isResponseSuccess
    }
});
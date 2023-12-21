import { fetchQuestionByCriteria,createQuestion,updateQuestion, deleteQuestion} from '../http/question-api'
import { csrfCookie } from '../http/auth-api'
import {defineStore} from 'pinia'
import {ref} from 'vue'
// 
export const useQuestionStore = defineStore('questionStore',()=>{
    const questions = ref([])
    const isSuccess = ref(false)
    const errors = ref([])
    
    const fetchQuestionFromCriteria = async(id)=>{
        try {
            questions.value = []
            const {data} = await fetchQuestionByCriteria({criteria_id:id})
            if(data.success){
                isSuccess.value = true
                questions.value = data.data
            }else{
                isSuccess.value = false
                questions.value = []
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }

    const addQuestion = async(id,val)=>{
        await csrfCookie()
        try {
            const {data} = await createQuestion({criteria_id:id,question:val})
            if(data.success){
                isSuccess.value = true
                questions.value.unshift(data.data)
            }else{
                questions.value = []
                isSuccess.value = false
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }

    const removeQuestion = async(id)=>{
        await csrfCookie()
        try {
            const {data} = await deleteQuestion(id)
            if(data.success){
                isSuccess.value = true
                questions.value = questions.value.filter(q => q.id != id)
            }else{
                isSuccess.value = false
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }


    const saveUpdateQuestion = async(id,val)=>{
        await csrfCookie()
        try {
            const {data} = await updateQuestion(id,{question:val})
            if(data.success){
                isSuccess.value = true
                questions.value = questions.value.map(question => {
                    if(question.id == id){
                        question.question = val
                        return question
                    }
                    return question
                })
            }else{
                questions.value = []
                isSuccess.value = false
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }



    return {
        questions,
        isSuccess,
        addQuestion,
        saveUpdateQuestion,
        removeQuestion,
        fetchQuestionFromCriteria
    }
})
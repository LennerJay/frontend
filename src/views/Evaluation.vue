<template>
    <div class="content">


        Evaluation
        <div>
            <h1 class="font-bold">Title: {{ questionaire.title }}</h1>
            <p>description: {{ questionaire.description }}</p>
            <QuestionForm v-for="criteria in questionaire.criterias" :criteria="criteria" :radioButtonStates="radioButtonStates"/>
            <hr class="h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700">
        </div>
        
    </div>
</template>

<script setup>
import { useQuestionaireStore } from '../stores/questionaire'
import { onMounted, ref } from 'vue'
import QuestionForm from '../components/QuestionForm.vue';


const store = useQuestionaireStore();
const radioButtonStates = ref([
    {rate:true},
    {rate:false},
    {rate:false},
    {rate:false},
    {rate:false},
]);
const questions = ref([]);
const questionaire  = ref([]);
const selectedValue= (val)=>{
    console.log(val);
    console.log('clicked');
}
onMounted(async ()=>{
    await store.fetchQuestionaire()
    const { data } = store.questionaires
    questionaire.value = data
    // console.log(Object.keys(questionaire))
    // console.time()
    // const { data } = store.questionaires
    // questionaire.value = data
    // console.log( questionaire.value)
    // console.timeEnd()
    console.log(radioButtonStates.rate1)
});

</script>
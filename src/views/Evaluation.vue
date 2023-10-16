<template>
    <div class="content">


        Evaluation

        <div class="questions">
            <h1 class="font-bold">Title: {{ questionaire.title }}</h1>
            <p>description: {{ questionaire.description }}</p>
            <QuestionForm v-for="(criteria,key) in questionaire.criterias" :criteria="criteria" :key="key" @ratingSelected="updateSelectedRatings" @handleSubmit="handleSubmit"/>
            <hr class="h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700">
        </div>
        
    </div>
</template>

<script setup>
import { useQuestionaireStore } from '../stores/questionaire'
import { onMounted, ref } from 'vue'
import QuestionForm from '../components/QuestionForm.vue';


const store = useQuestionaireStore();

const selectedRatings = [];
const questionaire  = ref([]);
const handleSubmit = ()=>{
    console.log(selectedRatings)
}
const updateSelectedRatings = (val) => { 
    const foundObj = selectedRatings.find(obj => obj['id'] === val.id);
    if(foundObj){
        foundObj['rating'] = val.rating
    }else{
        selectedRatings.push(val)
    }
}
onMounted(async ()=>{
    await store.fetchQuestionaire()
    const { data } = store.questionaires
    questionaire.value = data
    for (let i = 0; i < sessionStorage.length; i++) {
        const id = sessionStorage.key(i);
        const rating = sessionStorage.getItem(id)
        if(rating > 5){
            sessionStorage.removeItem(id)
        }else{
            selectedRatings.push({id:Number(id),rating:Number(sessionStorage.getItem(id))})
        }
    }

});

</script>
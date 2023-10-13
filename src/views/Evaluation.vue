<template>
    <LoadingAnimation v-if="isLoading"/>
    <div class="md:ml-[250px] ml-0 bg-sky-900 font-serif px-2 w-full" v-else>
        <div class="header header pl-2 pt-2 text-white">
            <div class="font-bold p-1 pb-5 pt-5 text-[30px]"><span class="inline-block md:hidden" @click="drawer.toggle"><i class="bi bi-filter-left px-5 p-1 bg-blue-700 rounded-md cursor-pointer"></i></span>Evaluation</div>
            <h1 class="font-bold pb-5">Title: {{ questionaire.title }}</h1>
            <p class="pb-3">Description: {{ questionaire.description }}</p>
            <!-- <hr class="h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"> -->
        </div>   
        <div class="bg-stone-200 pt-1">
            <QuestionForm v-for="(criteria,key) in questionaire.criterias" :criteria="criteria" :key="key" @ratingSelected="updateSelectedRatings" @handleSubmit="handleSubmit"/>
        </div> 
    </div>
</template>

<script setup>
import { useQuestionaireStore } from '../stores/questionaire'
import { useDrawerStore } from "../stores/drawerStore"
import { onMounted, ref } from 'vue'
import QuestionForm from '../components/QuestionForm.vue';
import LoadingAnimation from '../components/LoadingAnimation.vue'

const store = useQuestionaireStore();
const drawer = useDrawerStore()
const isLoading = ref(true)
const selectedRatings = [];
const questionaire  = ref([]);
const handleSubmit = ()=>{
    console.log(selectedRatings)
}

const loadedData = () => {
        isLoading.value = false
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
    loadedData();
});

</script>
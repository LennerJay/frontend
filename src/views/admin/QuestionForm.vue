<template>
    <div class="content">
        <div>
            Question Form
        </div>
        <div v-if="showTable">
            <button class="border border-black p-1" @click="handleBack">Back</button>
            <h1>{{ selectedQuestionaire.title }}</h1>
            <p>{{ selectedQuestionaire.description }}</p>
            <p>Semester: {{ selectedQuestionaire.semester }}</p>
            <p>School Year: {{ selectedQuestionaire.school_year }}</p>
            <p>Max Respondents: {{ selectedQuestionaire.max_respondents }}</p>
            <table v-for="(criteria,key) in selectedQuestionaire.criterias" :key="key" class="border border-black p-1 m-3">
                <thead>
                    <tr>
                        <td> {{ criteria.description }}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="question in criteria.questions">
                        <td>{{ question.question }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="flex gap-2 ">
            <div class="border-2 border-black p-2" v-for="questionaire in questionaires" @click="selectQuestionaire(questionaire.id)">
                <h1>{{ questionaire.title }}</h1>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useQuestionaireStore } from '../../stores/questionaire'
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const questionaireStore = useQuestionaireStore();


const questionaires = ref([]);
const showTable = ref(false);
const selectedQuestionaire = ref();

const selectQuestionaire = (id) =>{
    selectedQuestionaire.value = questionaires.value.find(questionaire => questionaire.id === id);
    console.log(selectedQuestionaire.value);
    localStorage.setItem('selectedQuestionaire',selectedQuestionaire);
    showTable.value = true;
}

const handleBack = () => {
    localStorage.removeItem('selectedQuestionaire');
    showTable.value = false;
}

onMounted(async()=>{
    // await questionaireStore.fetchQuestionaire()
    // questionaires.value = questionaireStore.questionaires
    // if(localStorage.getItem('selectedQuestionaire')){
    //     selectedQuestionaire.value = localStorage.getItem('selectedQuestionaire')
    //     showTable.value = true;
    // }
});
</script>

<style lang="scss" scoped>

</style>
<template>
    <div class="content">
        <div>
            Question Form
        </div>
        <table>
            <caption> </caption>
            <thead>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                </tr>
            </thead>
            <tbody>
            
            </tbody>
        </table>
        <div class="flex gap-2 ">
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
const { questionaires } = storeToRefs(questionaireStore)

// const questionaires = ref([]);
const showTable = ref(false);
const selectedQuestionaire = ref();

const selectQuestionaire = (id) =>{
    console.log(id);
    questionaires.value = questionaireStore.questionaires.filter(questionaire => questionaire.id === id);
    console.log(questionaires.value);
}

onMounted(async()=>{
    await questionaireStore.fetchQuestionaire()
    // questionaires.value = questionaireStore.questionaires
    console.log(questionaireStore.questionaires)
});
</script>

<style lang="scss" scoped>

</style>
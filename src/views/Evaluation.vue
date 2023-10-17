<template>
    <div class="content">
        <div>
                <h1 class="font-bold"> Evaluation for: {{ name }}</h1>
        </div>
        <div v-if="show">
            <div class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5">
                <ProfileCard v-for="(instructor,index) in instructors" :instructor="instructor" :key="index" @click="selectInstructor(instructor.id)"/>
            </div>
        </div>
        <div v-else>
            <div class="questions">
                <h1 class="font-bold">Title: {{ questionaire.title }}</h1>
                <p>description: {{ questionaire.description }}</p>
                <QuestionForm v-for="(criteria,key) in questionaire.criterias" :criteria="criteria" :key="key" @ratingSelected="updateSelectedRatings" @handleSubmit="handleSubmit"/>
                <hr class="h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700">
            </div>
        </div>
        
    </div>
</template>

<script setup>
import ProfileCard from '../components/ProfileCard.vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useInstructorStore } from '../stores/instructor';
import { useQuestionaireStore } from '../stores/questionaire';
import { onMounted, ref } from 'vue';
import QuestionForm from '../components/QuestionForm.vue';

const instructorStore = useInstructorStore()
const store = useQuestionaireStore();
const router = useRouter()
const {instructors} = storeToRefs(instructorStore)

const selectedInstructor = ref('')
const selectedRatings = ref([]);
const questionaire  = ref([]);
const show = ref(true)
const name = ref('')

const selectInstructor = (id)=>{
    const instructor = instructors.value.find(obj => obj.id === id)
    selectedInstructor.value = instructor
    localStorage.setItem('selectedInstructor', JSON.stringify(instructor))
    name.value = instructor.name
    show.value = false
}


const handleSubmit = ()=>{
    console.log(selectedRatings.value)
    console.log(selectedInstructor.value)
    localStorage.clear()
    selectedRatings.value = []
    console.log(selectedRatings.value)
    router.go(0)
 
}


const updateSelectedRatings = (val) => { 
    const foundObj = selectedRatings.value.find(obj => obj['id'] === val.id);
    if(foundObj){
        foundObj['rating'] = val.rating
    }else{
        selectedRatings.value.push(val)
    }
}


onMounted(async ()=>{
    await store.fetchQuestionaire()
    await instructorStore.fetchAllInstructors()
    const { data } = store.questionaires
    questionaire.value = data
    for (let i = 0; i < localStorage.length; i++) {
        const id = localStorage.key(i);
        const rating = localStorage.getItem(id)
        if(rating > 5){
            localStorage.removeItem(id)
        }else{
            selectedRatings.value.push({id:Number(id),rating:Number(localStorage.getItem(id))})
        }
    }
    selectedInstructor.value = JSON.parse(localStorage.getItem('selectedInstructor'))
    if(selectedInstructor.value){
        name.value = selectedInstructor.value.name
        show.value = false
    }
    console.log(selectedInstructor.value)
    console.log(show.value)
});

</script>
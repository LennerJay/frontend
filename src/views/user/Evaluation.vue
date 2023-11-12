<template>
    <div class="md:ml-[250px] ml-0 font-Times New Roman px-0 w-full text-center">
        <div class="header pt-2 bg-sky-950 text-white text-center">
            <div class="flex justify-center items-center font-bold text-[20px]">
              <span class="flex md:hidden pl-2" @click="drawer.toggle">
                <i class="bi bi-filter-left px-5 p-1 bg-blue-900 rounded-md cursor-pointer"></i>
              </span>
                <h1 class="header-name">Evaluation for: {{ name }}</h1>
            </div>    
        </div>

        <div v-if="show" class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5 hover:cursor-pointer">
            <ProfileCard v-for="(evaluatee,index) in evaluatees" :evaluatee="evaluatee" :key="index" @click="selectEvaluatee(evaluatee.id)"/>
        </div>
        <FooterCard v-if="show"/>
        <div v-else class="questions">
            <h1 class="font-bold">Title: {{ questionaire.title }}</h1>
            <p>description: {{ questionaire.description }}</p>
            <QuestionForm v-for="(criteria,key) in questionaire.criterias" :criteria="criteria" :key="key" @ratingSelected="updateSelectedRatings" @handleSubmit="handleSubmit"/>
            <hr class="h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700">
            <div class="p-5 border-solid border-2 mx-96 py-1 hover:bg-sky-950 hover:text-white">
                <button @click="handleSubmit" :disabled="!isSubmitButtonEnabled">Submit</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import QuestionForm from '../../components/QuestionForm.vue';
import ProfileCard from '../../components/ProfileCard.vue';
import FooterCard from '../../components/FooterCard.vue'
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router'
import { useEvaluateeStore } from '../../stores/evaluatee';
import { useQuestionaireStore } from '../../stores/questionaire';
import { onMounted, ref, computed } from 'vue';
import { useRatingStore } from '../../stores/rating'
import { useDrawerStore } from '../../stores/drawerStore';

const drawer = useDrawerStore()
const userStore  = useAuthStore()
const evaluateeStore = useEvaluateeStore()
const store = useQuestionaireStore();
const router = useRouter()
// const { evaluatees } = storeToRefs(evaluateeStore)
const { user,errors } = userStore
const rating = useRatingStore()
const selectedevaluatee = ref('')
const selectedRatings = ref([]);
const questionaire  = ref([]);
const show = ref(true)
const name = ref('')
const evaluatees = ref('')


const selectEvaluatee = async (id)=>{
    const evaluatee = evaluatees.value.find(obj => obj.id === id)
    const departmentId = evaluatee.departments[0].id
    console.log(departmentId)
    await store.fetchQuestionaireForEvaluatee(departmentId);
    questionaire.value = store.questionaireForEvaluatee
    selectedevaluatee.value = evaluatee
    localStorage.setItem('selectedevaluatee', JSON.stringify(evaluatee))
    name.value = evaluatee.name
    show.value = false

}

const isSubmitButtonEnabled = computed(() => {
  if (!questionaire.value || !questionaire.value.criterias) {
    return false;
  }

  for (const criteria of questionaire.value.criterias) {
    for (const question of criteria.questions) {
      const foundObj = selectedRatings.value.find(
        (obj) => obj['question_id'] === question.id
      );

      // If any question is not rated or rated as undefined, return false
      if (!foundObj || foundObj.rating === undefined || foundObj.rating === null) {
        return false;
      }
    }

  // If all questions have been rated, return true
  return true;
}});

const handleSubmit = async ()=>{
    console.log(selectedRatings.value)
    // selectedRatings.value.map( val => {
    //     val.evaluator_id = user.id_number
    // })
    // const value = {
    //     instructorId : selectedevaluatee.value.id,
    //     user_id : user.id_number,
    //     val: [...selectedRatings.value]
        
    // }
    // console.log(user.id_number)
    // console.log(value)
    // await rating.save(value)
    // if(rating.response.data.code === 201){
    //     const keys = Object.keys(localStorage);
    //     const keepKeys = ["instructors","questionaires"];
    //     for (const key of keys) {
    //         if(keepKeys.includes(key)){
    //             continue;
    //         }
    //         localStorage.removeItem(key)
    //     }
    //     selectedRatings.value = []
    //     router.go(0)
    // }
}


const updateSelectedRatings = (val) => { 
    const foundObj = selectedRatings.value.find(obj => obj['question_id'] === val.question_id);
    if(foundObj){
        foundObj['rating'] = val.rating
    }else{
        selectedRatings.value.push(val)
    }
}


onMounted(async ()=>{
    if(localStorage.getItem('selectedevaluatee')){
        selectedevaluatee.value = JSON.parse(localStorage.getItem('selectedevaluatee'))
        name.value = selectedevaluatee.value.name
        show.value = false
    }else{
        await userStore.fetchEvaluateesToRate(user.id_number)
        evaluatees.value = userStore.filterEvaluatees(false)
        console.log(evaluatees.value)
    }
    if(localStorage.getItem('questionaire-for-evaluatee')){
        questionaire.value =  JSON.parse(localStorage.getItem('questionaire-for-evaluatee'))
    }

    let qId = []
    questionaire.value.criterias.forEach(criteria => {
        criteria.questions.forEach(question => {
            qId.push(question.id)
        })
    });

    if(localStorage.length > 0){
        for (let i = 0; i < localStorage.length; i++) {
            const id = localStorage.key(i);
            if(qId.includes(Number(id))){
                const rating = localStorage.getItem(id)
                if(rating > 5){
                    localStorage.removeItem(id)
                }else{
                    selectedRatings.value.push({question_id:Number(id),rating:Number(localStorage.getItem(id))})
                }
            }else if(!!Number(id)){
                localStorage.removeItem(id)
            }
        }
    }
});
</script>

<style scoped>

    .header {
        background-color: #0C4A6E;
        padding: 25px 15px;
        font-family: Helvetica, Georgia, "Times New Roman";
    }

    .header-name {
        font-weight: bold;
        font-size: 20px;
    }

</style>
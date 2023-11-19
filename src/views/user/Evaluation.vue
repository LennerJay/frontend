<template>
    <div class="md:ml-[250px] ml-0  font-serif px-0 w-full text-center">
        <div class="header pl-2 pt-2 bg-sky-950 text-white text-center">
            <div class="font-bold p-1 text-[20px]">
              <span class="inline-block md:hidden" @click="drawer.toggle">
                <i class="bi bi-filter-left px-5 p-1 bg-blue-700 rounded-md cursor-pointer"></i>
              </span>
                <h1 class="header-name">Evaluation for: {{ name }}</h1>
            </div>    
        </div>
        <div class="bg-stone-200 min-h-[44rem] card overflow-x-auto">
            <div v-if="show" >           
                <div v-if="showProfileCard" class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5 hover:cursor-pointer">
                    <ProfileCard v-for="(evaluatee,index) in evaluatees" :evaluatee="evaluatee" :key="index"  option="Select" @selectedEvaluatee="selectEvaluatee"/>
                </div>
                <div v-else class="pl-10 pr-[120px] max-h-[26rem] ml-20">
                    <div class="loader3 mt-10 pt-24">
                        <div class="circle1"><span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1">L</span></div>
                        <div class="circle1"><span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1">O</span></div>
                        <div class="circle1"><span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1">A</span></div>
                        <div class="circle1"><span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1">D</span></div>
                        <div class="circle1"><span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1">I</span></div>
                        <div class="circle1"><span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1">N</span></div>
                        <div class="circle1"><span class="text-[8px] text-white absolute bottom-1 top-1 left-1 right-1">G</span></div>
                    </div>
                </div>
            </div>
            <div v-else class="questions">
                <h1 class="font-bold text-lg">Title: {{ questionaire.title }}</h1>
                <p>description: {{ questionaire.description }}</p>
                <QuestionForm class="text-black question-card pb-4 rounded-2xl mt-4 mx-4 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                v-for="(criteria,index) in questionaire.criterias" :criteria="criteria" :key="index" @ratingSelected="updateSelectedRatings" @handleSubmit="handleSubmit"/>
                <div class="flex justify-between mb-2 mx-4">
                    <button id="submit-btn">Back</button>
                    <button @click="handleSubmit" id="submit-btn">Submit</button>
                </div>
            </div>
        </div>    
        <FooterCard/>  
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
const selectedEvaluatee = ref('')
const selectedRatings = ref([]);
const questionaire  = ref([]);
const show = ref(true)
const name = ref('')
const evaluatees = ref('')
const showProfileCard = ref(false)

const selectEvaluatee = async (id)=>{
    const evaluatee = evaluatees.value.find(obj => obj.id === id)
    const departmentId = evaluatee.departments[0].id
    await store.fetchQuestionaireForEvaluatee(departmentId);
    questionaire.value = store.questionaireForEvaluatee
    selectedEvaluatee.value = evaluatee
    localStorage.setItem('selectedEvaluatee', JSON.stringify(evaluatee))
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

    selectedRatings.value.map( val => {
        val.evaluator_id = user.id_number
    })
    const value = {
        instructorId : selectedEvaluatee.value.id,
        user_id : user.id_number,
        val: [...selectedRatings.value]
        
    }
    await rating.save(value)
    if(rating.response.data.code === 201){
        const keys = Object.keys(localStorage);
        const keepKeys = ["instructors","questionaires"];
        for (const key of keys) {
            if(keepKeys.includes(key)){
                continue;
            }
            localStorage.removeItem(key)
        }
        selectedRatings.value = []
        evaluatees.value = evaluatees.value.filter(evaluatee => evaluatee.id !== selectedEvaluatee.value.id)
        name.value = ''
        show.value = true
    }else{
        alert('something went wrong')
    }

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
    if(localStorage.getItem('selectedEvaluatee')){
        selectedEvaluatee.value = JSON.parse(localStorage.getItem('selectedEvaluatee'))
            if(localStorage.getItem('questionaire-for-evaluatee')){
                questionaire.value =  JSON.parse(localStorage.getItem('questionaire-for-evaluatee'))
            }else{
                await store.fetchQuestionaireForEvaluatee(selectedEvaluatee.value.departments[0].id);
                questionaire.value = store.questionaireForEvaluatee
            }
            let qId = []
            questionaire.value.criterias.forEach(criteria => {
                criteria.questions.forEach(question => {
                    qId.push(question.id)
                })
                console.log(criteria.questions.length)
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
        name.value = selectedEvaluatee.value.name
        show.value = false
    }else{
        await evaluateeStore.fetchEvaluateesToRate(user.id_number)
        console.log(evaluateeStore.evaluateesToRate)
        showProfileCard.value = true
        evaluatees.value = evaluateeStore.filterEvaluatees(false)

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
    .question-card {
        background-color: rgba(255, 255, 255, 0.5);
        box-shadow: 35px 35px 68px 0px rgba(127, 147, 224, 0.2);
        transition: all 0.3s;
    }
    #submit-btn {
    position: relative;
    padding: 5px 20px;
    border-radius: 7px;
    border: 1px solid rgb(216, 217, 219);
    font-size: 10px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 2px;
    background: transparent;
    color: #fff;
    overflow: hidden;
    box-shadow: 0 0 0 0 transparent;
    -webkit-transition: all 0.2s ease-in;
    -moz-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
    margin-left: 10px;
    margin-right: 10px;
    }

    #submit-btn:hover {
    background: rgb(61, 106, 255);
    box-shadow: 0 0 30px 5px rgba(0, 142, 236, 0.815);
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;
    }

    #submit-btn:hover::before {
    -webkit-animation: sh02 0.5s 0s linear;
    -moz-animation: sh02 0.5s 0s linear;
    animation: sh02 0.5s 0s linear;
    }

    #submit-btn::before {
    content: '';
    display: block;
    width: 0px;
    height: 86%;
    position: absolute;
    top: 7%;
    left: 0%;
    opacity: 0;
    background: #fff;
    box-shadow: 0 0 50px 30px #fff;
    -webkit-transform: skewX(-20deg);
    -moz-transform: skewX(-20deg);
    -ms-transform: skewX(-20deg);
    -o-transform: skewX(-20deg);
    transform: skewX(-20deg);
    }

    @keyframes sh02 {
    from {
        opacity: 0;
        left: 0%;
    }

    50% {
        opacity: 1;
    }

    to {
        opacity: 0;
        left: 100%;
    }
    }

    #submit-btn:active {
    box-shadow: 0 0 0 0 transparent;
    -webkit-transition: box-shadow 0.2s ease-in;
    -moz-transition: box-shadow 0.2s ease-in;
    transition: box-shadow 0.2s ease-in;
    }

</style>
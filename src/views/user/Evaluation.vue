<template>
    <div class="flex">
        <div class="md:ml-[250px] ml-0  font-serif px-0 w-full text-center">
        <div class="header pl-2 pt-2 bg-indigo-900 text-white text-center">
            <div class="font-bold p-1 text-[20px]">
              <span class="inline-block md:hidden" @click="drawer.toggle">
                <i class="bi bi-filter-left px-5 p-1 bg-blue-700 rounded-md cursor-pointer"></i>
              </span>
                <h1 class="header-name">Evaluation for: {{ name }}</h1>
            </div>    
        </div>

        <div v-if="showProfileCards">
           <div class="selectTags">
            <div ref="selectRef">
                <SelectTag  class="select-dropdown"  @selectValue="selectedValue"  :course="department" @show="show" :open="openSelectTag" @closeTag="closeTag" :option="'departments'"></SelectTag>
            </div>
            <div>
                <SelectJobType :selectTypeJob="selectTypeJob" @jobTypeSelected="handleTypeSelected" />
            </div>
           </div>
            <div v-if="showProfileCard" class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5 hover:cursor-pointer">
                <ProfileCard v-for="(evaluatee,index) in evaluatees" :evaluatee="evaluatee" :key="index"  option="Select" @selectedEvaluatee="selectEvaluatee"/>
            </div>
            <div v-else>
                    Loading Data
            </div>
        </div>
        <div v-else class="questions">
        <button class="border border-red-100">Back</button>
            <div>
                <h1 class="font-bold">Title: {{ questionaire.title }}</h1>
                <p>description: {{ questionaire.description }}</p>
                <QuestionForm v-for="(criteria,index) in questionaire.criterias" :criteria="criteria" :key="index" @ratingSelected="updateSelectedRatings" @handleSubmit="handleSubmit"/>
                <hr class="h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700">
                <div class="flex justify-between">
                    <button >Back</button>
                    <button @click="handleSubmit">Submit</button>
                </div>
            </div>
        </div>
    </div>
    
    </div>
</template>

<script setup>
import QuestionForm from '../../components/QuestionForm.vue';
import ProfileCard from '../../components/ProfileCard.vue';
import { useAuthStore } from '../../stores/auth';
import { useEvaluateeStore } from '../../stores/evaluatee';
import { useQuestionaireStore } from '../../stores/questionaire';
import { onMounted, ref, computed } from 'vue';
import { useRatingStore } from '../../stores/rating'
import { useDrawerStore } from '../../stores/drawerStore';
import SelectTag from '../../components/SelectTag.vue';
import SelectJobType from '../../components/SelectJobType.vue';

const drawer = useDrawerStore()
const userStore  = useAuthStore()
const evaluateeStore = useEvaluateeStore()
const store = useQuestionaireStore();
const department = ref("All Departments")
const { user,errors } = userStore
const rating = useRatingStore()
const selectedEvaluatee = ref('')
const selectedRatings = ref([]);
const questionaire  = ref([]);
const showProfileCards = ref(true)
const name = ref('')
const evaluatees = ref('')
const showProfileCard = ref(false)
const openSelectTag = ref(false)
const selectRef = ref('')
const selectTypeJob = ref('All')

const selectEvaluatee = async (id)=>{
    const evaluatee = evaluatees.value.find(obj => obj.id === id)
    const departmentId = evaluatee.departments[0].id
    await store.fetchQuestionaireForEvaluatee(departmentId);
    questionaire.value = store.questionaireForEvaluatee
    selectedEvaluatee.value = evaluatee
    localStorage.setItem('selectedEvaluatee', JSON.stringify(evaluatee))
    name.value = evaluatee.name
    showProfileCards.value = false

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
const handleSelectTag = (event)=>{
    if (selectRef.value == null) {
        return; // Exit early if event.target is null
    }
    if(!selectRef || !selectRef.value.contains(event.target)){
        openSelectTag.value = false
    }

}
const selectedValue = (departmentName)=>{
    if(departmentName === 'allDepartments'){
        department.value = 'All Departments'
        evaluatees.value = evaluateeStore.filterEvaluatees(selectTypeJob.value,departmentName)
    }else{
        department.value = departmentName
        evaluatees.value =  evaluateeStore.filterEvaluatees(selectTypeJob.value,departmentName)

    }
    openSelectTag.value = false
}
const show = (val)=>{
    openSelectTag.value = val
}
const closeTag= ()=>{
    openSelectTag.value = false
}
const handleTypeSelected = (val)=>{
    selectTypeJob.value = val
    evaluatees.value = evaluateeStore.filterEvaluatees(selectTypeJob.value,department.value)
}



onMounted(async ()=>{
    document.addEventListener('click', handleSelectTag);
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
        evaluatees.value = evaluateeStore.isRatedEvaluatees(false)

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
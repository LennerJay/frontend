<template>
    <div class="content">
      <div>
        <h1 class="font-bold">Evaluation for: {{ name }}</h1>
      </div>
  
      <div v-if="show" class="mt-8 grid gap-10 lg:grid-cols-3 sm-grid-cols-2 p-5 hover:cursor-pointer">
        <ProfileCard v-for="(evaluatee, index) in evaluatees" :evaluatee="evaluatee" :key="index" @click="selectEvaluatee(evaluatee.id)" />
      </div>
      <div v-else class="questions">
        <h1 class="font-bold">Title: {{ questionaire.title }}</h1>
        <p>description: {{ questionaire.description }}</p>
        <QuestionForm :criteria="currentCriteria" @ratingSelected="updateSelectedRatings" />
  
        <hr class="h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700">
        <div class="flex justify-between">
            <button @click="changeCriterion(-1)" :disabled="isFirstCriterion">Back</button>
            <button @click="changeCriterion(1)" :disabled="isLastCriterion || !isCurrentCriterionFilled" v-if="!isLastCriterion">Next</button>
            <button @click="handleSubmit" :disabled="!isAllQuestionsAnswered" v-else>Submit</button>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import QuestionForm from '../../components/QuestionForm.vue';
import ProfileCard from '../../components/ProfileCard.vue';
import { useAuthStore } from '../../stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { useEvaluateeStore } from '../../stores/evaluatee';
import { useQuestionaireStore } from '../../stores/questionaire';
import { onMounted, ref, computed } from 'vue';
import { useRatingStore } from '../../stores/rating'
  
const userStore = useAuthStore()
const evaluateeStore = useEvaluateeStore()
const store = useQuestionaireStore();
const router = useRouter()
const { evaluatees } = storeToRefs(evaluateeStore)
const { user, errors } = userStore
const rating = useRatingStore()
const selectedevaluatee = ref('')
const selectedRatings = ref([]);
const questionaire = ref([]);
const show = ref(true)
const name = ref('')
const ratings = ref({});
const selectedRatingsByCriterion = ref({});

const selectEvaluatee = (id) => {
    const evaluatee = evaluatees.value.find(obj => obj.id === id)
    selectedevaluatee.value = evaluatee
    localStorage.setItem('selectedevaluatee', JSON.stringify(evaluatee))
    name.value = evaluatee.name
    show.value = false
    selectedRatings.value = [];
}
  
const handleSubmit = async () => {
    selectedRatings.value.forEach(val => {
      val.evaluator_id = user.id_number
    });
    const value = {
      instructorId: selectedevaluatee.value.id,
      val: [...selectedRatings.value]
    };
    console.log(value);
    await rating.save(value);
    if (rating.response.data.code === 201) {
      const keys = Object.keys(localStorage);
      const keepKeys = ["instructors", "questionaires"];
      for (const key of keys) {
        if (!keepKeys.includes(key)) {
          localStorage.removeItem(key);
        }
      }
      selectedRatings.value = [];
      router.go(0);
    }
}
  
const updateSelectedRatings = (val) => { 
    if (!Array.isArray(selectedRatings.value)) {
        selectedRatings.value = [];
    }
    const foundObj = selectedRatings.value.find(obj => obj.question_id === val.question_id);
    if (foundObj) {
        foundObj.rating = val.rating;
    } else {
        selectedRatings.value.push(val);
    }
    ratings.value[currentCriteria.value.id] = selectedRatings.value;
}
  
onMounted(async () => {
    if (!localStorage.getItem('evaluatees')) {
      await evaluateeStore.fetchAllEvaluatees();
    }
    if (!localStorage.getItem('questionaires')) {
      await store.fetchQuestionaire();
    }
  
    const { data } = store.questionaires;
    questionaire.value = data;
    let qId = [];
    questionaire.value.criterias.forEach(criteria => {
      criteria.questions.forEach(question => {
        qId.push(question.id);
      });
    });
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const id = localStorage.key(i);
        if (qId.includes(Number(id))) {
          const rating = localStorage.getItem(id);
          if (rating > 5) {
            localStorage.removeItem(id);
          } else {
            selectedRatings.value.push({ question_id: Number(id), rating: Number(localStorage.getItem(id)) });
          }
        }
      }
    }
    selectedevaluatee.value = JSON.parse(localStorage.getItem('selectedevaluatee'));
    if (selectedevaluatee.value) {
      name.value = selectedevaluatee.value.name;
      show.value = false;
    }
    questionaire.value.criterias.forEach(criteria => {
        selectedRatingsByCriterion.value[criteria.id] = localStorage.getItem(`ratings_${criteria.id}`) || [];
    });
});
  
const currentCriterionIndex = ref(0);
const isFirstCriterion = computed(() => currentCriterionIndex.value === 0);
const currentCriteria = computed(() => questionaire.value.criterias[currentCriterionIndex.value]);
const isLastCriterion = computed(() => currentCriterionIndex.value === questionaire.value.criterias.length - 1);

const changeCriterion = (direction) => {
  if (direction === 1 && !isLastCriterion.value || direction === -1 && !isFirstCriterion.value) {
    const currentCriterion = currentCriteria.value;
    selectedRatingsByCriterion.value[currentCriterion.id] = [...selectedRatings.value];
    localStorage.setItem(`ratings_${currentCriterion.id}`, JSON.stringify(selectedRatings.value));

    currentCriterionIndex.value += direction;
    // Load the selected ratings for the next/previous criterion
    selectedRatings.value = selectedRatingsByCriterion.value[currentCriteria.value.id] || [];
  }
}

const isAllQuestionsAnswered = computed(() => {
  if (!Array.isArray(selectedRatings.value)) {
    return false;
  }
  return isCurrentCriterionFilled.value && currentCriteria.value.questions.every(question => {
    const foundObj = selectedRatings.value.find(obj => obj.question_id === question.id);
    return foundObj && foundObj.rating !== undefined;
  });
});

const isCurrentCriterionFilled = computed(() => {
  return currentCriteria.value.questions.every(question => {
    const foundObj = selectedRatings.value.find(obj => obj.question_id === question.id);
    return foundObj && foundObj.rating !== undefined;
  });
});

</script>
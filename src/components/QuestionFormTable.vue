<template>
    <div class="mb-4">
      <h1 class="font-bold pt-2 pb-2 border border-white rounded-2xl"> {{ criteria.description }}</h1>
      <form :id="criteria.id">
        <input type="hidden" name="criteria_id" :value="criteria.id">
        <div v-for="(question, key) in criteria.questions" :key="key">
          <div class="question-container md:flex md:justify-between md:items-center mt-4">
            <p class="question-text">{{ key + 1 }}. {{ question.question }}</p>
            <div class="radio-group grid md:grid-row-5 pl-16 pb-2 cursor-pointer">
              <div v-for="value in values" :key="value" class="radio-item">
                <input
                  type="radio"
                  :name="question.id"
                  :id="'criteria'+ criteria.id +'question' + question.id + 'rating'+ value"
                  :checked="value == getValue(question.id)"
                  :value="value"
                  @input="ratingSelected(question.id, value, `criteria`.id)"
                />
                <label
                  class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                  :for="'criteria'+ criteria.id +'question' + question.id + 'rating'+ value"
                >{{ value }}</label>
              </div>
            </div>
          </div>
          <hr v-if="key < criteria.questions.length - 1" class="bg-sky-950">
        </div>
      </form>
    </div>
</template>
  
  <script setup>
  import { useLocalStorageStore } from '../stores/localStorage.js';
  defineProps({
    criteria: Object,
  });
  
  const values = [1, 2, 3, 4, 5];
  const store = useLocalStorageStore();
  const emit = defineEmits(['ratingSelected', 'handleSubmit']);
  const ratingSelected = (id, rating) => {
    localStorage.setItem(id, rating);
    emit('ratingSelected', { question_id: id, rating: rating });
  };
  const getValue = (id) => {
    return localStorage.getItem(id);
  };
  </script>
  
  <style scoped>
  .question-container {
    padding: 0 20px;
  }
  
  .question-text {
    margin-bottom: 1rem;
  }
  
  .radio-group {
    display: flex;
  }
  
  .radio-item {
    margin-right: 1rem;
  }
  </style>
  
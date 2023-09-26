<template>
  <div class="content">
    <Question
      v-for="(question, index) in questions"
      :key="index"
      :questionId="`question_${index}`"
      :question="question.questionText"
      :options="question.options"
      @option-selected="updateSelectedOptions"
    ></Question>

    <div>
      <p>Selected Options:</p>
      <ul>
        <li v-for="(option, index) in selectedOptions" :key="index">
          {{ option.questionId }}: {{ option.selectedOption }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Question from "../components/Question.vue";

export default {
  components: {
    Question,
  },
  data() {
    return {
      questions: [
        {
          questionText: "What is your favorite color?",
          options: ["Red", "Blue", "Green"],
        },
        {
          questionText: "What is your favorite animal?",
          options: ["Dog", "Cat", "Bird"],
        },
        // Add more questions as needed
      ],
      selectedOptions: [],
    };
  },
  methods: {
    updateSelectedOptions(questionId, selectedOption) {
      // Update the selectedOptions array when a radio button is selected
      this.selectedOptions.push({ questionId, selectedOption });
    },
  },
};
</script>

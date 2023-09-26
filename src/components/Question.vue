<template>
  <div>
    <p>{{ question }}</p>
    <label v-for="(option, index) in options" :key="index">
      <input
        type="radio"
        :value="option"
        :name="questionId"
        @input="selectOption(option)"
      >
      {{ option }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    questionId: String,
    question: String,
    options: Array,
  },
  methods: {
    selectOption(option) {
      this.$emit("option-selected", this.questionId, option);
    },
  },
};
</script>

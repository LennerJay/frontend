<template>
    <div class="containerr">
      <button class="border border-black p-1" id="back-button" @click="$emit('backButton')">Back</button>
          <h1>Title: {{ selectedQuestionaire.title }}</h1>
          <p>Description: {{ selectedQuestionaire.description }}</p>
          <p>Semester: {{ selectedQuestionaire.semester }}</p>
          <p>School Year: {{ selectedQuestionaire.school_year }}</p>
          <p>Max Respondents: {{ selectedQuestionaire.max_respondents }}</p>
    </div><!-- End of container -->
</template>

<script setup>
  const props = defineProps({
      selectedQuestionaire:Object,
  });
</script>

<style scoped>

  button#back-button {
    border: none;
    outline: none;
    background-color: #0C4A6E;
    color: #ffffff;
    border-radius: 3px;
    padding: 8px 20px;
  }

  button#back-button:hover {
    background-color: #000000;
    color: #ffffff;
    cursor: pointer;
  }

</style>
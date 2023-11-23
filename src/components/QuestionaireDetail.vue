<template>
    <div class="">
      <button class="border border-black p-1" @click="$emit('backButton')">Back</button>
      <h1>Title: {{ selectedQuestionaire.title }}</h1>
      <p>Description: {{ selectedQuestionaire.description }}</p>
      <p>Semester: {{ selectedQuestionaire.semester }}</p>
      <p>School Year: {{ selectedQuestionaire.school_year }}</p>
      <p>Max Respondents: {{ selectedQuestionaire.max_respondents }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    selectedQuestionaire:Object,
});
</script>

<style lang="scss" scoped>

</style>
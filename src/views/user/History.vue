<template>
  <div class="content">
    <h1>These are the people you evaluated</h1>

    <ProfileCard v-for="(evaluatee,index) in evaluatees" :evaluatee="evaluatee" :key="index"/>
    
  </div>
</template>

<script setup>
import ProfileCard from "../../components/ProfileCard.vue";
import { ref,onMounted } from "vue"
import { useAuthStore } from "../../stores/auth";
import { useEvaluateeStore } from "../../stores/evaluatee";

const evaluatees = ref([]);
const userStore = useAuthStore();
const evaluateeStore = useEvaluateeStore();


onMounted(async() => {
  await evaluateeStore.fetchAllEvaluated(userStore.user.id_number)
  evaluatees.value = evaluateeStore.evaluated.evaluatees
  
})
</script>

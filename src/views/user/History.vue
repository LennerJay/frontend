<template>
  <div class="content">
    <h1>These are the people you evaluated</h1>


  </div>
</template>

<script setup>
import { ref,onMounted } from "vue"
import { useAuthStore } from "../../stores/auth";
import { useEvaluateeStore } from "../../stores/evaluatee";

const userStore = useAuthStore();
const evaluateeStore = useEvaluateeStore();


onMounted(async() => {
  // console.log(userStore.user.id_number)
  await evaluateeStore.fetchAllEvaluated(userStore.user.id_number)

})
</script>

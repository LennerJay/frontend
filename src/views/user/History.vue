<template>
  <div class="md:ml-[250px] ml-0  font-Times New Roman px-0 w-full text-center">
    <h1>These are the people you evaluated</h1>

    <div v-if="show">
      <ProfileCard v-for="(evaluatee,index) in evaluatees" :evaluatee="evaluatee" :key="index"/>
    </div>
    <div v-else>
      Loading History... / No Data Found
    </div>
    <FooterCard/>
  </div>
</template>

<script setup>
import ProfileCard from "../../components/ProfileCard.vue";
import { ref,onMounted } from "vue"
import { useAuthStore } from "../../stores/auth";
import { useEvaluateeStore } from "../../stores/evaluatee";
import FooterCard from '../../components/FooterCard.vue'

const evaluatees = ref([]);
const userStore = useAuthStore();
const evaluateeStore = useEvaluateeStore();
const show = ref(false);

const { user,errors } = userStore

onMounted(async() => {
  await evaluateeStore.fetchEvaluateesToRate(user.id_number)
  evaluatees.value = evaluateeStore.isRatedEvaluatees(true)
  console.log(evaluatees.value.length)
  if(evaluatees.value.length > 0){
    show.value = true
  }
})
</script>

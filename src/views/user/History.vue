<template>
  <div class="flex">
    <div class="md:ml-[300px] ml-0 font-serif px-0 w-full main-container">
      <div class="container">
          <div class="content">
              <!-- <h1>These are the people you evaluated</h1> -->
              <h2>History</h2>
              <h3>Cordova Public College</h3>
              <span class="school-year">SY: 2023-2024</span>

          </div><!-- End of content -->
      </div><!-- End of container -->

      <div class="actual-history">
        <div v-if="show" style="width: 80%; margin: auto;">
          <ProfileCard v-for="(evaluatee,index) in evaluatees" :evaluatee="evaluatee" :key="index" style="width: 100%; margin: 15px auto 16px auto;"/>
        </div>
        <div v-else>
          Loading History... / No Data Found
        </div>
      </div>

      <FooterCard/>
    </div>
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

<style scoped>

    /* PENETRATION TESTING */

    .container {
      width: 100%;
      margin: auto;
      background-color: #0C4A6E;
      color: #ffffff;
      font-family: Helvetica, Georgia, "Times New Roman";
    }

    .container .content {
      padding: 15px 10px;
      text-align: center;
    }

    .container .content h2 {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .actual-history {
      margin: 100px auto 180px auto;
    }

    .school-year {
      display: block;
    }

    /* PENETRATION TESTING */

</style>

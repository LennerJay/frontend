<template>
  <div class="ratings-container bg-white">
    <div>
      <button @click="emits('back')" class="bg-sky-900 text-white w-20 rounded my-2 mx-2 h-8 hover:bg-sky-600 font-poppins">Back</button>
    </div>
    <div class="flex flex-col items-center justify-center text-center font-sans">
      <div class="flex items-center justify-center flex-grow w-full">
        <img src="../assets/ched_logo.png" class="h-24 w-24 md:mr-10">
        <div class="flex flex-col items-center">
          <span class="font-medium text-[20px]">Republic of the Philippines</span>
          <span class="font-medium text-[20px]">Province of Cebu</span>
          <span class="font-medium text-[20px]">Municipality of Cordova</span>
          <span class="font-bold text-[28px]">Cordova Public College</span>
          <span class="font-bold text-[28px]">{{ questionaire.title }}</span>
          <span class="font-bold text-[24px] capitalize">{{ questionaire.description }}</span>
        </div>
        <img src="../assets/cpc_logo.png" class="h-24 w-24 md:ml-10">
      </div>
    </div>
    <div class="md:pl-8 font-poppins text-left w-full mb-4 mt-2">
      <p><span class="font-bold mr-2">Name of Faculty :</span><span class="border-b border-black">{{ evaluatee.name }}</span></p>
      <p><span class="font-bold mr-2">Department <span style="margin-left: 34px">:</span></span><span class="border-b border-black capitalize">{{ evaluatee.departments.join(", ") }}</span></p>
      <p><span class="font-bold mr-2">Rating Period <span style="margin-left: 19px">:</span></span><span class="border-b border-black capitalize">{{ questionaire.semester }} A. Y {{ questionaire.school_year }}</span></p>
    </div>
    <div class="flex flex-col md:pl-8 font-poppins mb-4">
      <div>
        <span class="font-bold mr-6" style="font-style: italic">5</span>
        <span class="font-bold mx-4" style="font-style: italic"> Outstanding (O)</span>
        <span class="md:ml-14">
          The performance always exceeds the job requirements. The instructor is an
          exceptional role model.
        </span>
      </div>
      <div>
        <span class="font-bold mr-6" style="font-style: italic">4</span>
        <span class="font-bold mx-4" style="font-style: italic">Very Satisfactory (VS)</span>
        <span class="md:ml-[17px]">The performance meets and often exceeds the job requirements.</span>
      </div>
      <div>
        <span class="font-bold mr-6" style="font-style: italic">3</span>
        <span class="font-bold mx-4" style="font-style: italic">Satisfactory (S)</span>
        <span class="md:ml-[65px]">The performance meets job requirements</span>
      </div>
      <div>
        <span class="font-bold mr-6" style="font-style: italic">2</span>
        <span class="font-bold mx-4" style="font-style: italic">Fair (F)</span>
        <span class="md:ml-[127px]">The performance needs some development to meet the job requirements.</span>
      </div>
      <div>
        <span class="font-bold mr-6" style="font-style: italic">1</span>
        <span class="font-bold mx-3" style="font-style: italic">Needs Improvement (NI)</span>
        <span class="md:ml-[5px]">The instructor fails to meet job performance.</span>
      </div>
    </div>
    <div class="ratings-content">
      <div class="table-container">
        <table class="main-table font-poppins" v-for="criteria in questionaire.criterias">
          <thead>
            <th>{{ criteria.description }}</th>
            <th>NI</th>
            <th>F</th>
            <th>S</th>
            <th>VS</th>
            <th>O</th>
            <th>Mean</th>
            <th>QD</th>
          </thead>
          <tbody>
            <tr v-for="question in criteria.questions">
              <td>
                {{ question.question }}
              </td>
              <td @click="showQuestionRating(question.id, 1)" class="cursor-pointer">{{ question.NI }}</td>
              <td @click="showQuestionRating(question.id, 2)" class="cursor-pointer">{{ question.F }}</td>
              <td @click="showQuestionRating(question.id, 3)" class="cursor-pointer">{{ question.S }}</td>
              <td @click="showQuestionRating(question.id, 4)" class="cursor-pointer">{{ question.VS }}</td>
              <td @click="showQuestionRating(question.id, 5)" class="cursor-pointer">{{ question.O }}</td>
              <td>{{ question.ratings_avg_rating }}</td>
              <td>{{ checkQd(question.ratings_avg_rating) }}</td>
            </tr>
            <tr>
              <td colspan="6" class="text-center font-bold">Average Weighted Mean</td>
              <td class="text-center font-bold"></td>
              <td class="text-center font-bold">terst</td>
            </tr>
          </tbody>
        </table>
        <!-- End of main-table -->
        <div class="w-full font-poppins" style="font-style: italic">
          <span>Legend: 4.21-5.0 - Outstading; 3.41-4.20 - Very Satisfactory; 2.61-3.40 - Satisfactory; 1.81-2.60 - Fair; 
            1.00-1.80 - Needs Improvement; QD - Qualitative Description
          </span><br>
          <span>Note: n = 50</span>
        </div>
        <div class="w-full flex flex-col font-semibold text-lg font-poppins mt-16">
          <span class="text-right pb-2 md:mr-80">Overall Mean: 123</span>
          <span class="text-right md:mr-96">Overall Performance: 123</span>
        </div>
        <div class="w-full font-poppins mt-20 pl-2">
          <div class="flex flex-col py-4">
            <span class="text-[18px]">Preared by:</span>
            <span class="pl-10 text-[18px]">JORDAN H. YAGONG, MA.Ed</span>
            <span class="pl-20 text-[18px]">Research Coordinator</span>
          </div>
          <div class="flex flex-col py-4">
            <span class="text-[18px]">Noted by:</span>
            <span class="pl-10 text-[18px]">JENYLEN T. CABISO, Dev.Ed.D</span>
            <span class="pl-20 text-[18px]">CTE Chairperson</span>
          </div>
          <div class="flex flex-col py-4">
            <span class="text-[18px]">Approved by:</span>
            <span class="pl-10 text-[18px]">FATIMA RICHELL F. EVIOTA, Dev.Ed.D</span>
            <span class="pl-24 text-[18px]">College President</span>
          </div>
        </div>
      </div>
      <RatingHistory
        v-if="showRatingHistory"
        :show-data="showData"
        :values="datas"
        @close="showRatingHistory = false"
      />
      <!-- End of table-container -->
    </div>
    <!-- End of ratings-content -->
  </div>
  <!-- End of ratings-container -->
</template>

<script setup>
import { ref } from "vue";
import { useRatingStore } from "../stores/rating";
import RatingHistory from "./RatingHistory.vue";

const props = defineProps(["questionaire", "evaluatee"]);
const showRatingHistory = ref(false);
const ratingStore = useRatingStore();
const showData = ref(false);
const datas = ref([]);

const showQuestionRating = async (qId, rating) => {
  showRatingHistory.value = true;
  showData.value = false;
  await ratingStore.getRatingInfo(props.evaluatee.id, qId, rating);
  datas.value = ratingStore.ratingResult;
  showData.value = true;
};

const checkQd = (mean) => {
  if (mean >= 1 && mean < 1.81) {
    return "IN";
  } else if (mean >= 1.81 && mean < 2.61) {
    return "F";
  } else if (mean >= 2.61 && mean < 3.41) {
    return "S";
  } else if (mean >= 3.41 && mean < 4.21) {
    return "VS";
  } else if (mean >= 4.21 && mean <= 5) {
    return "O";
  }
};

const emits = defineEmits(["back"]);
</script>

<style scoped>
/* Code Blocks Here */
.ratings-container {
  width: 100%;
  margin: auto auto auto auto;
}

.ratings-container .ratings-content {
  padding: 8px 15px;
  width: 100%;
  margin: 0 auto 0 auto;
}

.ratings-content .table-container {
  margin-bottom: 20px;
}

.ratings-content .main-table {
  border-collapse: collapse;
  border: 1px solid gray;
  width: 100%;
  margin: auto;
}

.main-table tr th,
td {
  border: 1px solid gray;
}

.main-table td {
  padding: 6px;
  width: 4.28%;
}

.main-table tr :not(td:first-child) {
  text-align: center;
}

.main-table td a {
  text-decoration: none;
  color: initial;
}

.main-table tr:nth-child(odd) {
  background-color: #f3f4f6;
  color: #000000;
}

.main-table tr th {
  font-family: "Times New Roman";
  padding: 5px;
}

.main-table .average {
  font-weight: bold;
  font-family: Helvetica;
  text-align: center;
  font-size: 16px;
}

.main-table {
  width: 100%;
  margin: auto;
}

@media screen and (max-width: 768px) {
  .ratings-container .main-table {
    overflow: scroll;
  }
}
</style>

<template>
  <button @click="emits('back')">Back</button>
  <div class="ratings-container">
    <div>
      <span>Republic of the Philippines</span>
      <span>Province of Cebu</span>
      <span>Cordova Public College</span>
      <span>{{ questionaire.title }}</span>
      <span>{{ questionaire.description }}</span>
    </div>
    <div>
      <p>Name of Faculty: {{ evaluatee.name }}</p>
      <p>Department : {{ evaluatee.departments.join(", ") }}</p>
      <p>Rating Period:{{ questionaire.semester }} A. Y {{ questionaire.school_year }}</p>
    </div>
    <div>
      <div>
        <span>5</span>
        <span> Outstanding (O)</span>
        <span
          >The performance always exceeds the job requirements. The instructor is an
          exceptional role model.</span
        >
      </div>
      <div>
        <span>4</span>
        <span>Very Satisfactory (VS)</span>
        <span>The performance meets and often exceeds the job requirements.</span>
      </div>
      <div>
        <span>3</span>
        <span>Satisfactory (S)</span>
        <span>The performance meets job requirements</span>
      </div>
      <div>
        <span>2</span>
        <span>Fair (F)</span>
        <span>The performance needs some development to meet the job requirements.</span>
      </div>
      <div>
        <span>1</span>
        <span>Needs Improvement (NI)</span>
        <span>The instructor fails to meet job performance.</span>
      </div>
    </div>
    <div class="ratings-content">
      <div class="table-container">
        <table class="main-table" v-for="criteria in questionaire.criterias">
          <!--min-w-max w-full table-auto-->
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
              <td @click="showQuestionRating(question.id, 1)">{{ question.NI }}</td>
              <td @click="showQuestionRating(question.id, 2)">{{ question.F }}</td>
              <td @click="showQuestionRating(question.id, 3)">{{ question.S }}</td>
              <td @click="showQuestionRating(question.id, 4)">{{ question.VS }}</td>
              <td @click="showQuestionRating(question.id, 5)">{{ question.O }}</td>
              <td>{{ question.ratings_avg_rating }}</td>
              <td>{{ checkQd(question.ratings_avg_rating) }}</td>
            </tr>
            <tr>
              <td colspan="6"><span>Average Weighted Mean</span></td>
              <td></td>
              <td>terst</td>
            </tr>
          </tbody>
        </table>
        <!-- End of main-table -->
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
  margin: auto auto 150px auto;
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

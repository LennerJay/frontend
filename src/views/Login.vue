<template>
  <div class="main-con">
    <div class="form-container">
      <div class="form-content">
        <div class="logo">
          <img
            src="../assets/cpc_logo.png"
            class="animate-bounce"
            alt="CPC Logo"
            width="80"
            height="80"
          />
          <span>Please provide your credentials to login</span>
        </div>
        <form
          @submit.prevent="handleSubmit"
          id="main-form"
          enctype="multipart/form-data"
          autocomplete="off"
        >
          <input
            type="text"
            name="email"
            value="..."
            autocomplete="username email"
            style="display: none"
          />
          <input
            type="number"
            v-model="form.id_number"
            :class="{ 'is-invalid': errors.id_number && errors.id_number[0] }"
            id="id_number"
            name="student_id"
            placeholder="Student ID"
            aria-label="student_id"
            hidden
          />
          <p
            v-if="errors.id_number && errors.id_number[0]"
            class="text-red-500 text-xs italic"
          >
            {{ errors.id_number && errors.id_number[0] }}
          </p>
          <div id="password-container">
            <div id="actual-password">
              <input
                type="password"
                @input="checker"
                v-model="form.password"
                :class="{ 'is-invalid': errors.password && errors.password[0] }"
                id="password"
                name="student_password"
                placeholder="Password"
                autocomplete="new-password"
              />
            </div>
            <p
              v-if="errors.password && errors.password[0]"
              class="text-red-500 text-xs italic"
            >
              Please input a password.
            </p>
            <i class="fa fa-eye eye-show" id="eye-show" @click="hideShow"></i>
            <i class="fa fa-eye fa-eye-slash" id="eye-hide" @click="hideShow"></i>
          </div>
          <button type="submit" id="sign-in" name="sign-in">Login</button>
        </form>
        <!-- End of main-form -->
      </div>
      <!-- End of form-content -->
    </div>
    <!-- End of form-container -->

    <FooterCard />
  </div>
  <!-- End of main-container -->
</template>

<script setup>
import FooterCard from "../components/FooterCard.vue";
import loginStyle from "../assets/loginStyle.css";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";

const hideShow = () => {
  const userPass = document.getElementById("password");
  const eyeShow = document.getElementById("eye-show");
  const eyeHide = document.getElementById("eye-hide");

  if (userPass.type == "password") {
    userPass.type = "text";
    eyeShow.style.display = "none";
    eyeHide.style.display = "block";
  } else {
    userPass.type = "password";
    eyeShow.style.display = "block";
    eyeHide.style.display = "none";
  }
};
const checker = () => {
  const passwordContainer = document.getElementById("password-container");
  const actualPassword = document.getElementById("actual-password");
  const eyeShow = document.getElementById("eye-show");
  const eyeHide = document.getElementById("eye-hide");
  const userPass = document.getElementById("password");

  if (userPass.value != "") {
    if (userPass.type == "text") {
      passwordContainer.style.backgroundColor = "#BFBFBF";
      actualPassword.style.width = "90%";
      eyeShow.style.display = "none";

      if (userPass.value == "") {
        /* userPass.type == null */
        console.log("Checked, logged!!! ");
        passwordContainer.style.backgroundColor = "none";
        actualPassword.style.width = "100%";
        eyeHide.style.display = "none";
      }
    } else if (userPass.type == "password") {
      passwordContainer.style.backgroundColor = "#BFBFBF";
      actualPassword.style.width = "90%";
      eyeShow.style.display = "block";
    }
  } else {
    passwordContainer.style.backgroundColor = "none";
    actualPassword.style.width = "100%";
    eyeShow.style.display = "none";
  }
};
// function hideShow() {
//   const userPass = document.getElementById("password");
//   const eyeShow = document.getElementById("eye-show");
//   const eyeHide = document.getElementById("eye-hide");

//   if (userPass.type == "password") {
//     userPass.type = "text";
//     eyeShow.style.display = "none";
//     eyeHide.style.display = "block";
//   } else {
//     userPass.type = "password";
//     eyeShow.style.display = "block";
//     eyeHide.style.display = "none";
//   }
// }

// function checker() {
//   const passwordContainer = document.getElementById("password-container");
//   const actualPassword = document.getElementById("actual-password");
//   const eyeShow = document.getElementById("eye-show");
//   const eyeHide = document.getElementById("eye-hide");
//   const userPass = document.getElementById("password");

//   if (userPass.value != "") {
//     if (userPass.type == "text") {
//       passwordContainer.style.backgroundColor = "#BFBFBF";
//       actualPassword.style.width = "90%";
//       eyeShow.style.display = "none";

//       if (userPass.value == "") {
//         /* userPass.type == null */
//         console.log("Checked, logged!!! ");
//         passwordContainer.style.backgroundColor = "none";
//         actualPassword.style.width = "100%";
//         eyeHide.style.display = "none";
//       }
//     } else if (userPass.type == "password") {
//       passwordContainer.style.backgroundColor = "#BFBFBF";
//       actualPassword.style.width = "90%";
//       eyeShow.style.display = "block";
//     }
//   } else {
//     passwordContainer.style.backgroundColor = "none";
//     actualPassword.style.width = "100%";
//     eyeShow.style.display = "none";
//   }
// }

const route = useRoute();
const router = useRouter();
const store = useAuthStore();
const { errors } = storeToRefs(store);
const { handleLogin } = store;
const form = ref({
  id_number: null,
  password: "",
});

const handleSubmit = async () => {
  await handleLogin(form.value);
  if (store.isLoggedIn) {
    if (store.isAdminStaff) {
      router.push({ name: "admin" });
    } else {
      router.push({ name: "dashboard" });
    }
  }
};

onMounted(async () => {
  //   const res = await store.testApi();
  //   console.log(res);
  // console.log(res.section_years)
  // let classesId = []
  // res.section_years.forEach(sy => {
  //     sy.klasses.forEach(klass => {
  //         classesId.push(klass.id)
  //     })
  // });
  // console.log(classesId)
  // const tmp = "asdasdq-1asdasd"
  // const t = tmp.split('-').j
  // console.log(t[1])
});
</script>

<style scoped>
/*
    .is-invalid{
        @apply border-2 border-red-600
    } */
</style>

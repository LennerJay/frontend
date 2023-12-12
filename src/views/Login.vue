<template>
  <div class="main-con">
    <div class="form-container">
      <div class="form-content">
        <div class="logo">
          <img src="../assets/cpc_logo.png" class="animate-bounce" alt="CPC Logo" width="80" height="80"/>
          <span>Please provide your credentials to login</span>
        </div>
        <form @submit.prevent="handleSubmit" id="main-form" method="POST" enctype="multipart/form-data" autocomplete="off">
          <p v-if="errors.id_number && errors.id_number[0]" class="stud-id-error text-red-500 text-xs italic">{{ errors.id_number && errors.id_number[0] }}</p>
          <input type="number" v-model="form.id_number" :class="{ 'is-invalid': errors.id_number && errors.id_number[0] }" id="id_number" name="student_id" placeholder="Student ID"/>
          <p v-if="errors.password && errors.password[0]" class="password-error text-red-500 text-xs italic">Please input a password.</p>
          <div id="password-container">
            <div id="actual-password">
              <input type="password" @input="checker()" v-model="form.password" :class="{ 'is-invalid': errors.password && errors.password[0] }" id="password" name="student_password" placeholder="Password"/>
            </div>
            <i class="fa fa-eye eye-show" id="eye-show" @click="hideShow()"></i>
            <i class="fa fa-eye fa-eye-slash" id="eye-hide" @click="hideShow()"></i>
          </div>
          <button type="submit" id="sign-in" name="sign-in">Login</button>
        </form><!-- End of main-form -->
      </div><!-- End of form-content -->
    </div><!-- End of form-container -->

    <FooterCard />
  </div><!-- End of main-container -->
</template>

<script setup>
import FooterCard from "../components/FooterCard.vue";
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
  if (Object.keys(store.errors).length === 0) {
    if (store.isLoggedIn) {
      if (store.isAdminStaff) {
        router.push({ name: "admin" });
      } else {
        router.push({ name: "dashboard" });
      }
    }
  } else {
  }
};

onMounted(async () => {
  const res = await store.testApi();
  console.log(res);
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

    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .main-con {
        width: 100%;
        margin: auto;
        overflow: hidden;
    }

    .main-con .form-container {
        width: 100%;
        margin: 100px auto 185px auto;
        padding: 15px 0 15px 0;
    }

    .form-container .form-content {
        width: 31%;
        margin: auto;
        background-color: #e6e6e6;
        position: relative;
        padding: 40px 15px;
        border-radius: 5px;
        box-shadow: 2px 2px 6px #a0a0a0;
    }

    .form-content .logo {
        position: relative;
        top: 50%;
        left: 41%;
        margin-bottom: 15px;
    }

    .form-content .logo img {
        display: block;
    }

    .form-content .logo span {
        display: block;
        font-size: 15px;
        font-family: Helvetica;
        margin-left: -98px;
        color: gray;
    }

    .form-content #main-form {
        width: 100%;
        margin: auto;
        background-color: #e6e6e6;
        padding: 15px 8px;
        text-align: center;
    }

    #main-form input[type="number"] {
        width: 90%;
        margin: auto auto 8px auto;
        display: block;
        outline: none;
        padding: 8px 15px;
        border-radius: 5px;
        text-align: center;
        font-family: Verdana;
    }

    #main-form #password-container {
        width: 90%;
        margin: auto;
        border-radius: 5px;
        display: flex;
        align-items: center;
        /* background-color: #BFBFBF; */
    }

    #main-form .stud-id-error,
    #main-form .password-error {
        margin-bottom: 5px;
    }

    #main-form #password-container input[type="password"],
    #main-form #password-container input[type="text"] {
        width: 100%;
        margin: auto;
        padding: 8px 25px;
        outline: none;
        text-align: center;
        border-top-left-radius: 5px;
        border-top-right-radius: none;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: none;
    }

    #main-form #password-container #actual-password {
        width: 100%;
    }

    #main-form #password-container i#eye-show,
    #main-form #password-container i#eye-hide {
        font-size: 18px;
        margin-left: 8px;
        display: block;
        display: none;
    }

    #main-form #password-container i#eye-show,
    #main-form #password-container i#eye-hide {
        margin-right: 8px;
    }

    #main-form #password-container i#eye-show:hover,
    #main-form #password-container i#eye-hide:hover {
        cursor: pointer;
    }

    #main-form #sign-in {
        display: block;
        width: 90%;
        margin: 20px auto 0 auto;
        border: none;
        outline: none;
        padding: 10px 15px;
        font-size: 16px;
        border-radius: 5px;
        font-family: Helvetica;
        background-color: #0c4a6e;
        color: #ffffff;
        text-align: center;
    }

    #main-form #sign-in:hover {
        background-color: #115f8b;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.3s ease 0s;
    }

    #main-form input[type="number"]::placeholder,
    #main-form input[type="password"]::placeholder,
    #main-form input[type="text"]::placeholder {
        text-align: center;
        font-size: 14px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        display: none;
    }

    /* MEDIA QUERIES */

    @media screen and (max-width: 768px) {
        .form-container .form-content {
        width: 90%;
        margin: auto;
        }
    }

</style>

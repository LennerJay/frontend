<template>
  <div class="main-container">
    <div class="main-content">
      <footer id="main-footer">
        <div class="footer-content">
          <div class="left-side-content">
            <div class="logo">
              <img
                src="../assets/cpc_logo.png"
                class="animate-bounce hover:animate-spin"
                alt="CPC Logo"
                width="80"
                height="80"
              />
              <span>Cordova Public College</span>
            </div>
            <div class="contact-location">
              <div class="phone">
                <i class="fas fa-phone h-6 mr-2"></i>
                <span>092 1102 2001</span>
              </div>
              <div class="location">
                <i class="fas fa-map-marker-alt mr-2"></i>
                <span>Cordova Public College | Gabi, 6017</span>
              </div>
            </div>
            <!-- End of contact-location -->
          </div>
          <!-- End of left-side content -->
          <div v-if="isAdmin" class="bookmarks">
            <router-link to="/">Dashboard</router-link>
            <router-link to="/ratings">Ratings</router-link>
            <router-link to="/question-form">Question Form</router-link>
            <router-link to="/evaluatees-list">Evaluatees List</router-link>
            <router-link to="/users-list">User List</router-link>
            <router-link to="/advance-options">Advance Options</router-link>
          </div>
          <div v-if="showBookmarks" class="bookmarks">
            <router-link to="/">Dashboard</router-link>
            <router-link to="/evaluatees">Evaluatees</router-link>
            <router-link to="/evaluation">Evaluation</router-link>
            <router-link to="/history">History</router-link>
            <router-link to="/profile">Profile</router-link>
          </div>
          
          <div class="soc-meds-content">
            <a href="https://www.facebook.com/EhrickRhed" target="_blank"
              >Eric Redolosa</a
            >
            <div class="soc-med-links">
              <a href="https://www.facebook.com/EhrickRhed" target="_blank"
                ><i class="fab fa-facebook"></i
              ></a>
              <a href="https://www.facebook.com/EhrickRhed" target="_blank"
                ><i class="fa fa-envelope"></i
              ></a>
              <a href="https://www.facebook.com/EhrickRhed" target="_blank"
                ><i class="fab fa-github"></i
              ></a>
            </div>
            <a href="https://www.facebook.com/lennersoliano" target="_blank"
              >Lenner Jay Soliano</a
            >
            <div class="soc-med-links">
              <a href="https://www.facebook.com/lennersoliano" target="_blank"
                ><i class="fab fa-facebook"></i
              ></a>
              <a href="mailto:lennersoliano@gmail.com" target="_blank"
                ><i class="fa fa-envelope"></i
              ></a>
              <a href="https://github.com/LennerJay" target="_blank"
                ><i class="fab fa-github"></i
              ></a>
            </div>
            <a href="https://www.facebook.com/xLenar30/" target="_blank">Ranel Soliano</a>
            <div class="soc-med-links">
              <a href="https://www.facebook.com/EhrickRhed" target="_blank"
                ><i class="fab fa-facebook"></i
              ></a>
              <a href="https://www.facebook.com/EhrickRhed" target="_blank"
                ><i class="fa fa-envelope"></i
              ></a>
              <a href="https://www.facebook.com/EhrickRhed" target="_blank"
                ><i class="fab fa-github"></i
              ></a>
            </div>
          </div>
          <!-- End of soc-meds-content -->
        </div>
        <!-- End of footer-content -->
      </footer>
      <!-- End of main-footer -->
    </div>
    <!-- End of main-content -->
    <div class="copyrights">
      <p>&copy; All Rights Reserved {{ currentYear }} - {{ currentYear + 1 }}</p>
      <p>Developed by Group Tactical Minds</p>
    </div>
    <!-- End of copyrights -->
  </div>
  <!-- End of main-container -->
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const currentYear = ref(null);
const showBookmarks = ref(false);
const route = useRoute();
const isAdmin = ref(false)

onMounted(() => {
  const date = new Date();
  currentYear.value = date.getFullYear();
  if (route.path != "/login") {
    showBookmarks.value = true;
  }
  if(route.path != "/login" && authStore.isAdminStaff) {
    isAdmin.value = true
    showBookmarks.value = false;
  }
});
</script>

<style scoped>
/* Code Goes Here */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.main-container {
  width: 100%;
  margin: auto;
  background-color: #f3f4f6;
}

.main-content {
  width: 100%;
  margin: auto auto 30px auto;
}

#main-footer {
  width: 100%;
  margin: auto;
  font-family: Helvetica, Georgia, "Times New Roman";
}

.footer-content {
  padding: 8px 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.footer-content .left-side-content {
  flex-direction: column;
}

.footer-content .logo {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.footer-content .logo img {
  display: block;
  float: left;
  margin-right: 5px;
}

.footer-content .logo span {
  display: block;
  font-size: 18px;
  font-weight: bold;
}

.footer-content .logo::after {
  content: "";
  clear: both;
  display: table;
}

.footer-content .left-side-content .contact-location {
  flex-direction: column;
}

.contact-location .phone i,
.contact-location .phone span,
.contact-location .location i,
.contact-location .location span {
  font-size: 14px;
  display: inline-block;
  margin-right: 8px;
}

.footer-content .bookmarks {
  margin-top: 40px;
}

.footer-content .bookmarks a {
  display: block;
  text-decoration: none;
  color: #ffffff;
  font-size: 14px;
  border: 1px solid #f3f4f6;
  outline: none;
  padding: 6px 25px;
  margin-bottom: 8px;
  text-align: center;
  background-color: #0c4a6e;
}

.footer-content .bookmarks a:hover {
  background-color: #f3f4f6;
  color: #000000;
  border: 1px solid #000000;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

.footer-content .soc-meds-content {
  flex-direction: column;
}

.footer-content .soc-meds-content > a {
  display: block;
  text-decoration: none;
  color: initial;
  font-size: 15px;
  text-align: center;
}

.footer-content .soc-meds-content > a:hover {
  cursor: pointer;
  text-decoration: underline;
}

.soc-meds-content .soc-med-links {
  margin-bottom: 15px;
  text-align: center;
}

.soc-meds-content .soc-med-links a {
  text-decoration: none;
  color: initial;
  margin-right: 12px;
}

.soc-meds-content .soc-med-links a i {
  font-size: 16px;
}

.main-container .copyrights {
  width: 100%;
  margin: auto;
  background-color: #e6e6e6;
  text-align: center;
  padding: 15px 0 15px 0;
}

.main-container .copyrights p {
  font-size: 14px;
}

/* ========== MEDIA QUERIES ========== */

@media screen and (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }

  .footer-content .logo {
    flex-direction: column;
    margin-top: 25px;
  }

  .footer-content .left-side-content .contact-location {
    text-align: center;
  }

  .footer-content .bookmarks {
    width: 90%;
    margin: 40px auto 30px auto;
  }

  .footer-content .bookmarks a {
    padding: 15px 0 15px 0;
  }
}
</style>

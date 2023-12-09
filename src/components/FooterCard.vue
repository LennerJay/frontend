<template>
  <div class="main-container">
      <div class="main-content">
          <footer id="main-footer">
              <div class="footer-content">
                  <div class="left-side-content">
                      <div class="logo">
                          <img src="../assets/cpc_logo.png" class="animate-bounce hover:animate-spin" alt="CPC Logo" width="80" height="80">
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
                      </div><!-- End of contact-location -->
                  </div><!-- End of left-side content -->
                  <div class="bookmarks">
                      <a href="#">Dashboard</a>
                      <a href="#">Evaluatees</a>
                      <a href="#">Evaluation</a>
                      <a href="#">History</a>
                      <a href="#">Profile</a>
                  </div>
                  <div class="soc-meds-content">
                      <a href="https://www.facebook.com/EhrickRhed">Eric Redolosa</a>
                      <div class="soc-med-links">
                          <a href="https://www.facebook.com/EhrickRhed"><i class='fab fa-facebook'></i></a>
                          <a href="https://www.facebook.com/EhrickRhed"><i class="fa fa-envelope"></i></a>
                          <a href="https://www.facebook.com/EhrickRhed"><i class='fab fa-github'></i></a>
                      </div>
                      <a href="https://www.facebook.com/lennersoliano">Lenner Jay Soliano</a>
                      <div class="soc-med-links">
                          <a href="https://www.facebook.com/EhrickRhed"><i class='fab fa-facebook'></i></a>
                          <a href="https://www.facebook.com/EhrickRhed"><i class="fa fa-envelope"></i></a>
                          <a href="https://www.facebook.com/EhrickRhed"><i class='fab fa-github'></i></a>
                      </div>
                      <a href="https://www.facebook.com/xLenar30/">Ranel Soliano</a>
                      <div class="soc-med-links">
                          <a href="https://www.facebook.com/EhrickRhed"><i class='fab fa-facebook'></i></a>
                          <a href="https://www.facebook.com/EhrickRhed"><i class="fa fa-envelope"></i></a>
                          <a href="https://www.facebook.com/EhrickRhed"><i class='fab fa-github'></i></a>
                      </div>
                  </div><!-- End of soc-meds-content -->
              </div><!-- End of footer-content -->

          </footer><!-- End of main-footer -->
      </div><!-- End of main-content -->
      <div class="copyrights">
          <p>&copy; All Rights Reserved 2023 - 2024</p>
          <p>Developed by Group Tactical Minds</p>
      </div><!-- End of copyrights -->
  </div><!-- End of main-container -->
</template>

<script>

  /* Code Goes Here */

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
      background-color: #F3F4F6;
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
      border: 1px solid #F3F4F6;
      outline: none;
      padding: 6px 25px;
      margin-bottom: 8px;
      text-align: center;
      background-color: #0C4A6E;
  }

  .footer-content .bookmarks a:hover {
      background-color: #F3F4F6;
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
      background-color: #E6E6E6;
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
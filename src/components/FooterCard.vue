<template>
    <div class="footer-container">
        <footer id="main-footer">
            <div class="footer-content">
                <div class="row">
                    <div class="column">
                        <div class="about-tactical">
                            <h3>Tactical Minds</h3>
                            <h4>Gabi, Cordova Public College</h4>
                            <h5>All Rights Reserved | Batch 2023-2024</h5>
                        </div>
                        <!-- <div class="contacts">
                            <p><a href="#"><i class="fas fa-envelope h-6 mr-2"></i>TacticalMinds@gmail.com</a></p>
                            <p><a href="#"><i class="fas fa-phone h-6 mr-2"></i>09211022001</a></p>
                            <p><a href="#"><i class="fas fa-map-marker-alt mr-2"></i>Gabi, Cordova 6017</a></p>
                        </div> -->
                        <!-- <div class="contact-service">
                            <button type="button">Contact & Service</button>
                        </div> -->
                    </div>
                </div>
                <hr class="thematic">
                <div class="soc-meds-content">
                    <!-- <div class="soc-meds-links">
                        <a href="#"><i class="fas fa-envelope h-6 mr-2"></i></a>
                        <a href="#"><i class="fas fa-phone h-6 mr-2"></i></a>
                        <a href="#"><i class="fas fa-map-marker-alt mr-2"></i></a>
                        <a href="#"><i class="fas fa-envelope h-6 mr-2"></i></a>
                    </div> -->
                    <div class="important-links">
                        <div class="soc-links">
                            <a href="https://www.facebook.com/lennersoliano">Lenner Jay Soliano</a>
                            <div class="icons cursor-pointer">
                                <i class='fab fa-facebook hover:text-blue-500'></i>
                                <i class="fa fa-envelope hover:text-blue-500"></i>
                                <i class='fab fa-github hover:text-blue-500'></i>
                            </div>
                        </div>
                        <div class="soc-links">
                            <a href="https://www.facebook.com/xLenar30/">Ranel Soliano</a>
                            <div class="icons cursor-pointer">
                                <i class='fab fa-facebook hover:text-blue-500'></i>
                                <i class="fa fa-envelope hover:text-blue-500"></i>
                                <i class='fab fa-github hover:text-blue-500'></i>
                            </div>
                        </div>
                        <div class="soc-links">
                            <a href="https://www.facebook.com/EhrickRhed">Eric Redolosa</a>
                            <div class="icons cursor-pointer">
                                <i class='fab fa-facebook hover:text-blue-500'></i>
                                <i class="fa fa-envelope hover:text-blue-500"></i>
                                <i class='fab fa-github hover:text-blue-500'></i>
                            </div>
                        </div>
                        <!-- <a href="#">Batch 2023-2024</a> -->
                    </div>
                    <div class="empty">
                        <!-- No content goes here -->
                    </div>
                </div><!-- End of soc-meds-content -->
            </div><!-- End of footer-content -->
        </footer><!-- End of main-footer -->
    </div><!-- End of footer-container -->
</template>
<script>
</script>
<style scoped>
.footer-container {
        background-color: rgb(8 47 73);
        padding: 15px 18px;
        width: 100%;
        margin: auto;
        font-family: Helvetica, Georgia, "Times New Roman";
        font-size: 16px;
        color: #ffffff;
    }

    .footer-container #main-footer {
        width: 100%;
        margin: auto;
        background-color: rgb(8 47 73);
    }

    #main-footer .footer-content {
        background-color: rgb(8 47 73);
        padding: 10px 12px;
        width: 100%;
        margin: auto;
    }

    #main-footer .footer-content .row .column {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    #main-footer .footer-content .row .column .about-tactical {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        margin-top: 60px;
    }

    .footer-content .row .column .about-tactical h3 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .footer-content .row .column .about-tactical h4 {
        font-size: 14px;
        margin-bottom: 10px;
    }

    .footer-content .row .column .about-tactical h5 {
        font-size: 14px;
    }

    /* #main-footer .footer-content .row .column .contacts a {
        text-decoration: none;
        color: #ffffff;
        font-size: 14px;
    } */

    /* #main-footer .footer-content .row .column .contact-service button {
        background-color: #297ACC;
        color: #ffffff;
        padding: 12px 15px;
        font-family: Helvetica, Georgia, "Times New Roman";
        font-size: 14px;
        border: none;
        outline: none;
    }

    #main-footer .footer-content .row .column .contact-service button:hover {
        cursor: pointer;
        color: #ffffff;
        background-color: #2563EB;
    } */

    .footer-content .thematic {
        width: 100%;
        margin: 0 auto 90px auto;
    }

    .soc-meds-content {
        /* display: flex;
        justify-content: space-between;
        align-items: center; */
        font-size: 14px;
    }

    .soc-meds-content .soc-meds-links {
        width: 30%;
        margin: auto;
    }

    .soc-meds-content .important-links {
        position: relative;
        top: 80%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        margin-top: 60px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 28%;
    }

    .soc-meds-content .important-links a {
        display: block;
        margin-bottom: 15px;
        text-decoration: underline;
        color: #ffffff;
        margin-right: 15px;
    }

    .soc-meds-content .important-links .soc-links {
        margin-bottom: 22px;
    }

    .soc-meds-content .important-links .soc-links i {
        font-size: 18px;
        margin-right: 18px;
    }
    .soc-meds-content .empty  {
        width: 50%;
        margin: 0 auto 0 auto;
    }

    .soc-meds-content .empty h5 {
        text-align: center;
        margin-top: 22px;
    }

    .soc-meds-content .soc-meds-links i  {
        display: inline-block;
        margin-right: 15px;
    }

    .soc-meds-content .important-links a:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        .footer-content .row .column {
            flex-direction: column;
        }

        .footer-container .footer-content {
            width: 100%;
            margin: auto;
            text-align: center;
        }

        .footer-content .row .column .contact-service button {
            width: 100%;
            margin: auto;
            display: block;
        }

        /* TO BE CONTIINUED CODING | PENETRATION TEST... */

        .soc-meds-content {
            flex-direction: column;
        }

        .soc-meds-content .soc-meds-links a {
            flex-direction: column;
            display: block;
        }

        .soc-meds-content .important-links {
            flex-direction: column;
            margin-top: 230px;
        }

        .soc-meds-content .important-links .soc-links .icons {
            width: 100%;
            margin: auto auto 20px auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
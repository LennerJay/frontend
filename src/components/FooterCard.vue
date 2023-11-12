<template>
    <div class="footer-container">
                <footer id="main-footer">
                    <div class="footer-content">
                        <div class="row">
                            <div class="column">
                                <div class="about-tactical">
                                    <h3>Tactical Minds</h3>
                                    <h4>Gabi, Cordova Public College</h4>
                                    <h5>All Rights Reserved 2023-2024</h5>
                                </div>
                                <div class="contacts">
                                    <p><a href="#"><i class="fas fa-envelope h-6 mr-2"></i>TacticalMinds@gmail.com</a></p>
                                    <p><a href="#"><i class="fas fa-phone h-6 mr-2"></i>09211022001</a></p>
                                    <p><a href="#"><i class="fas fa-map-marker-alt mr-2"></i>Gabi, Cordova 6017</a></p>
                                </div>
                                <div class="contact-service">
                                    <button type="button">Contact & Service</button>
                                </div>
                            </div>
                        </div>
                        <hr class="thematic">
                        <div class="soc-meds-content">
                            <div class="soc-meds-links">
                                <a href="#"><i class="fas fa-envelope h-6 mr-2"></i></a>
                                <a href="#"><i class="fas fa-phone h-6 mr-2"></i></a>
                                <a href="#"><i class="fas fa-map-marker-alt mr-2"></i></a>
                                <a href="#"><i class="fas fa-envelope h-6 mr-2"></i></a>
                            </div>
                            <div class="important-links">
                                <a href="#">Lenner Jay Soliano</a>
                                <a href="#">Ranel Soliano</a>
                                <a href="#">Eric Redolosa</a>
                                <a href="#">Batch 2023-2024</a>
                            </div>
                            <div class="empty">
                                <!-- No Content goes here -->
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

    .footer-content .row .column .about-tactical h3 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .footer-content .row .column .about-tactical h4 {
        font-size: 14px;
        margin-bottom: 3px;
    }

    .footer-content .row .column .about-tactical h5 {
        font-size: 14px;
    }

    #main-footer .footer-content .row .column .contacts a {
        text-decoration: none;
        color: #ffffff;
        font-size: 14px;
    }

    #main-footer .footer-content .row .column .contact-service button {
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
    }

    .footer-content .thematic {
        width: 100%;
        margin: 25px auto 25px auto;
    }

    .soc-meds-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
    }

    .soc-meds-content .soc-meds-links {
        width: 30%;
        margin: auto;
    }

    .soc-meds-content .important-links {
        width: 40%;
        margin: auto;
    }
    .soc-meds-content .empty  {
        width: 30%;
        margin: auto;
    }

    .soc-meds-content .soc-meds-links i  {
        display: inline-block;
        margin-right: 15px;
    }

    .soc-meds-content .important-links a {
        text-decoration: underline;
        color: #ffffff;
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
    }
</style>
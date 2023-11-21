<template>

    <div class="header-container">
        <div class="header-content">
            <header id="main-header">
                <div class="logo">
                    <img src="../assets/cpc_logo.png" alt="CPC Logo" width="80" height="80">
                </div>
                <div class="title">
                    <h1>About Us</h1>
                </div>
                <div class="empty">
                    <!-- Nothing goes here -->
                </div>
            </header>
        </div><!-- End of header-content -->

        <div class="back-button-container">
            <button type="button" id="back-button" name="button" value="back">Back</button>
        </div><!--End of back-button -->

        <section class="about-us-container">
            <div class="about-us-content">
                <div class="dev-content">
                    <div class="dev-info">
                        <div class="dev-img">
                            <img src="../assets/developer-img.png" alt="Developers Information" width="120" height="120">
                            <span>Lenner Jay Soliano</span>
                        </div>
                        <div class="dev-description">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi eligendi ratione error nihil accusantium labore, 
                                rem quos tempora adipisci sed, delectus expedita. Illum animi officiis hic tempore sed veritatis dolor.
                            </p>
                        </div>
                        <div class="soc-links">
                            <a href="#"><i class='fab fa-facebook'></i></a>
                            <a href="#"><i class="fa fa-envelope"></i></a>
                            <a href="#"><i class='fab fa-github'></i></a>
                        </div>
                    </div><!-- End of dev-info -->
                    <div class="dev-info">
                        <div class="dev-img">
                            <img src="../assets/developer-img.png" alt="Developers Information" width="120" height="120">
                            <span>Ranel Soliano</span>
                        </div>
                        <div class="dev-description">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi eligendi ratione error nihil accusantium labore, 
                                rem quos tempora adipisci sed, delectus expedita. Illum animi officiis hic tempore sed veritatis dolor.
                            </p>
                        </div>
                        <div class="soc-links">
                            <a href="#"><i class='fab fa-facebook'></i></a>
                            <a href="#"><i class="fa fa-envelope"></i></a>
                            <a href="#"><i class='fab fa-github'></i></a>
                        </div>
                    </div><!-- End of dev-info -->
                    <div class="dev-info">
                        <div class="dev-img">
                            <img src="../assets/developer-img.png" alt="Developers Information" width="120" height="120">
                            <span>Eric Redolosa</span>
                        </div>
                        <div class="dev-description">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi eligendi ratione error nihil accusantium labore, 
                                rem quos tempora adipisci sed, delectus expedita. Illum animi officiis hic tempore sed veritatis dolor.
                            </p>
                        </div>
                        <div class="soc-links">
                            <a href="#"><i class='fab fa-facebook'></i></a>
                            <a href="#"><i class="fa fa-envelope"></i></a>
                            <a href="#"><i class='fab fa-github'></i></a>
                        </div>
                    </div><!-- End of dev-info -->
                </div>
            </div><!-- End of about-us-content -->
        </section><!-- End of about-us-container -->

        <FooterCard />

    </div><!-- End of header-container -->

</template>

<script setup>

    import FooterCard from '../components/FooterCard.vue'

</script>

<style scoped>

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .header-container {
        width: 100%;
        margin: auto;
    }

    .header-container .header-content {
        background-color: #0C4A6E;
    }

    #main-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 15px;
    }

    #main-header .title h1 {
        color: #ffffff;
        font-size: 25px;
        font-family: Verdana, Helvetica;
        font-weight: 700;
    }

    .back-button-container {
        position: relative;
    }

    .back-button-container button#back-button {
        position: absolute;
        border: none;
        outline: none;
        padding: 8px 20px;
        font-family: Helvetica;
        font-size: 14px;
        background-color: #0C4A6E;
        color: #ffffff;
        top: 30px;
        left: 200px;
        border-radius: 3px;
    }

    .back-button-container button#back-button:hover {
        background-color: #E6E6E6;
        color: #000000;
    }

    .about-us-container {
        position: relative;
        width: 80%;
        margin: auto auto 200px auto;
        top: 100px;
    }

    .about-us-container .about-us-content {
        width: 100%;
        margin: auto;
        padding: 50px;
        background-color: #0C4A6E;
        border-top-right-radius: 30px;
        border-bottom-left-radius: 30px;
    }

    .about-us-content .dev-content {
        width: 100%;
        margin: auto;
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .dev-content .dev-info {
        width: 31.5%;
        margin: auto;
        background-color: #ffffff;
        border-radius: 3px;
    }

    .dev-content .dev-info .dev-img {
        width: 100%;
        margin: auto;
        padding: 10px 15px;
    }

    .dev-content .dev-info img {
        display: block;
        border-radius: 50%;
        margin: 10px auto 15px auto;
    }

    .dev-info .dev-img span {
        display: block;
        text-align: center;
    }

    .dev-content .dev-info .dev-description {
        width: 80%;
        margin: auto;
    }

    .dev-content .dev-info .dev-description p {
        font-size: 15px;
        font-family: Helvetica, Georgia, "Times New Roman";
        text-align: center;
    }

    .dev-content .dev-info .soc-links {
        width: 80%;
        margin: 15px auto 15px auto;
        padding: 10px 15px;
        text-align: center;
    }

    .dev-content .dev-info .soc-links a {
        text-decoration: none;
    }

    .dev-content .dev-info .soc-links i {
        margin-right: 25px;
        font-size: 18px;
    }

    /* ================= MEDIA QUERIES ================ */

    @media screen and (max-width: 768px) {
        .header-container .header-content {
            position: sticky;
            top: 0;
            z-index: 1;
        }

        .back-button-container {
            position: relative;
            z-index: 1;
        }

        .back-button-container button#back-button {
            position: fixed;
            top: 160px;
            left: 13.5px;   
        }

        #main-header {
            flex-direction: column;
        }

        .about-us-content .dev-content {
            flex-direction: column;
        }

        .about-us-container {
            width: 100%;
            margin: auto auto 200px auto;
        }

        .about-us-container .about-us-content {
            padding: 15px 5px 5px 5px;
            border-radius: 0;
        }

        .dev-content .dev-info {
            width: 100%;
            margin: auto auto 20px auto;
        }

        .dev-info .dev-img span {
            margin-bottom: 10px;
        }

        .dev-content .dev-info .dev.dev-description {
            width: 100%;
            margin: auto;
        }

        .dev-content .dev-info .soc-links {
            width: 100%;
            margin: 20px auto 20px auto;
        }
    }

</style>
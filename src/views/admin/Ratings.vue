<template>
    <div class="md:ml-[250px] w-full h-screen">
        <div class="header-container">
            <header id="main-header">
                <h1>Ratings</h1>
                <h2>Cordova Public College</h2>
            </header>
        </div><!-- End of header-container -->

        <A_Commitment />
        <FooterCard />

    </div><!-- End of main-container -->
</template>

<script setup>

    /* Code Blocks Here */
    import A_Commitment from "../../components/A_Commitment.vue";
    import FooterCard from "../../components/footercard.vue";

</script>

<style scoped>

    /* Code Blocks Here */
    .main-container {
        overflow-y: scroll;
    }
    
    .header-container {
        background-color: #0C4A6E;
        width: 100%;
        margin: auto auto 40px auto;
        position: sticky;
        top: 0;
    }

    .header-container #main-header {
        padding: 15px 0 15px 0;
        color: #ffffff;
        text-align: center;
    }

    #main-header h1 {
        color: #ffffff;
        font-size: 24px;
        font-family: Verdana;
        font-weight: bold;
    }

    #main-header h2 {
        color: #ffffff;
        font-size: 20px;
        font-family: Verdana;
    }

</style>
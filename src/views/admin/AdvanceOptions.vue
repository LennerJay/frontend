<template>
   <div class="md:ml-[250px] w-full h-screen w-screen">
        <div class="header-container">
            <header id="main-header">
                <h1>Advance Options</h1>
                <h2>Cordova Public College</h2>
            </header>
            <div class="objects">
                <div class="object-content">
                    <ul>
                        <li><button type="button" id="department" name="department">Departments</button></li>
                        <li><button type="button" id="year-sec" name="year_sec">Year & Sections</button></li>
                        <li><button type="button" id="entities" name="entities">Entities</button></li>
                        <li><button type="button" id="subject" name="subject">Subjects</button></li>
                    </ul>
                </div>
            </div>
        </div><!-- End of header-container -->

        <OptionDepartment />
        <OptionYearSection />
        <OptionEntities />
        <OptionSubjects />
        <footerCard />

    </div><!-- End of main-container -->
</template>

<script setup>

    /* Code Blocks Here */
    import OptionDepartment from "../../components/OptionDepartment.vue";
    import OptionYearSection from "../../components/OptionYearSection.vue";
    import OptionEntities from "../../components/OptionEntities.vue";
    import OptionSubjects from "../../components/OptionSubjects.vue";
    import FooterCard from "../../components/footercard.vue";

</script>

<style scoped>

    /* Code Blocks Here */

    .main-container {
        overflow-y: scroll;
    }
    
    .header-container {
        width: 100%;
        margin: auto auto 40px auto;
        position: sticky;
        top: 0;
    }

    .header-container #main-header {
        background-color: #0C4A6E;
        padding: 15px 0 15px 0;
        color: #ffffff;
        text-align: center;
    }

    #main-header h1 {
        color: #ffffff;
        font-size: 18px;
        font-family: Verdana;
        font-weight: bold;
    }

    #main-header h2 {
        color: #ffffff;
        font-size: 16px;
        font-family: Verdana;
    }

    .header-container .objects {
        background-color: #E6E6E6;
        width: 100%;
        margin: auto;
    }

    .objects .object-content {
        color: #000000;
        padding: 20px 15px;
        width: 80%;
        margin: auto;
    }

    .objects .object-content ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .objects .object-content ul li {
        display: inline;
    }

    .objects .object-content ul li button {
        display: block;
        background-color: #0C4A6E;
        color: #ffffff;
        padding: 10px 18px;
        border: none;
        outline: none;
        font-family: Helvetica;
        border-radius: 35px;
        font-size: 13.5px;
    }

    .objects .object-content ul li button:hover {
        background-color: #ffffff;
        color: #000000;
        cursor: pointer;
        transition: all 0.3s ease 0s;
    }

</style>
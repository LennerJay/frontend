<template>
    <div class="ratings-container">
        <div class="ratings-content">
            <div class="table-container">
                <table class="main-table">
                    <!--min-w-max w-full table-auto-->
                    <thead>
                        <tr>
                            <th style="width: 70%">A. COMMITMENT</th>
                            <th>NI</th>
                            <th>F</th>
                            <th>S</th>
                            <th>VS</th>
                            <th>O</th>
                            <th>Mean</th>
                            <th>QD</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1. Demonstrate sensitivity to student's ability to attend and absorb content information.</td>
                            <td><a href="#">0</a></td>
                            <td><a href="#">3</a></td>
                            <td><a href="#">9</a></td>
                            <td><a href="#">21</a></td>
                            <td><a href="#">17</a></td>
                            <td><a href="#">4.04</a></td>
                            <td>VS</td>
                        </tr>
                        <tr>
                            <td>2. Integrates sensitivity his/her learning objectives with those of the students in a collaborative process.</td>
                            <td><a href="#">0</a></td>
                            <td><a href="#">3</a></td>
                            <td><a href="#">9</a></td>
                            <td><a href="#">21</a></td>
                            <td><a href="#">17</a></td>
                            <td><a href="#">4.04</a></td>
                            <td>VS</td>
                        </tr>
                        <tr>
                            <td>3. Make self-available to students during consultation hours.</td>
                            <td><a href="#">0</a></td>
                            <td><a href="#">3</a></td>
                            <td><a href="#">9</a></td>
                            <td><a href="#">21</a></td>
                            <td><a href="#">17</a></td>
                            <td><a href="#">4.04</a></td>
                            <td>VS</td>
                        </tr>
                        <tr>
                            <td>4. Regulary comes to class on time, well-groomed and well prepared.</td>
                            <td><a href="#">0</a></td>
                            <td><a href="#">3</a></td>
                            <td><a href="#">9</a></td>
                            <td><a href="#">21</a></td>
                            <td><a href="#">17</a></td>
                            <td><a href="#">4.04</a></td>
                            <td>O</td>
                        </tr>
                        <tr>
                            <td>5. Keeps accurate records of student's performance and prompt submission of the same.</td>
                            <td><a href="#">0</a></td>
                            <td><a href="#">3</a></td>
                            <td><a href="#">9</a></td>
                            <td><a href="#">21</a></td>
                            <td><a href="#">17</a></td>
                            <td><a href="#">4.04</a></td>
                            <td>VS</td>
                        </tr>
                        <tr>
                            <td class="average">Average Weighted Mean</td>
                            <td colspan="6" style="text-align: center;">4.13</td>
                            <td>VS</td>
                        </tr>
                    </tbody>
                </table><!-- End of main-table -->
            </div><!-- End of table-container -->

        </div><!-- End of ratings-content -->
    </div><!-- End of ratings-container -->
</template>

<script>

    /* Code Blocks Here */

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

    .main-table tr th, td {
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
        background-color: #F3F4F6;
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
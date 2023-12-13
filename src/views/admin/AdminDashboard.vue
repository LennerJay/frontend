<template>
    <div class="flex">
        <div class="md:ml-[250px] ml-0 font-poppins px-0 w-full dashboard-main-header overflow-hidden" >
            <!-- <div class="header pl-2 md:py-6 text-white text-center" style="background-color: #33B86C;">
                <span class="md:hidden flex pt-4">
                    <i class=" bi bi-filter-left px-5 p-1 bg-blue-900 hover:bg-blue-600 rounded-md cursor-pointer text-[30px] ml-2" @click="drawer.toggle"></i>
                </span> 
                <div class="font-bold p-1 text-[30px]">
                    DASHBOARD
                <h1 class="header-name">Cordova Public College</h1>
                </div>
        </div> -->
        <div class="header-container">
                <header id="main-header">
                    <span class="burger-container md:hidden flex pt-4">
                        <i class=" bi bi-filter-left px-5 p-1 rounded-md cursor-pointer text-[30px] ml-2" @click="drawer.toggle"></i>
                    </span>
                    <div class="main-content">
                        <h1>Dashboard</h1>
                        <p>Cordova Public College</p>
                    </div>
                </header><!-- End of main-header -->
        </div><!-- End of header-container -->

        <div class="dashboard-body-container">
                <div class="dashboard-content">
                    <div class="overview">
                        <h2>Overview</h2>
                    </div>
                    <div class="card-container">
                        <div class="main-card students-enrolled hover:-translate-y-1 hover:scale-90">
                            <div class="card-content">
                                <div class="description">
                                    <p>{{ res.total_users }}</p>
                                    <p class="title">Students Enrolled</p>
                                </div>
                                <i class="bi bi-person-fill mr-1 text-2xl"></i>
                            </div>
                        </div>
                        <div class="main-card evaluatees-registered hover:-translate-y-1 hover:scale-90">
                            <div class="card-content">
                                <div class="description">
                                    <p>{{ res.total_evaluatees }}</p>
                                    <p class="title">Evaluatees Registered</p>
                                </div>
                                <i class="bi bi-clipboard-data-fill mr-1 text-2xl"></i>
                            </div>
                        </div>
                        <div class="main-card nan hover:-translate-y-1 hover:scale-90">
                            <div class="card-content">
                                <div class="description">
                                    <p class="title">NaN</p>
                                </div>
                                <i class="bi bi-bank2 mr-1 text-2xl"></i>
                            </div>
                        </div>
                    </div><!-- End of card-container -->
                    
                    <div class="graph-container">
                        <div class="graph-content">
                            <div class="card-container mt-6 grid gap-8 lg:grid-cols-2 sm-grid-cols-1 p-5 m-10 rounded-md">
                                <div class="first-card first-letter:bg-sky-900 flex flex-col justify-center items-center text-center md:h-96 h-72   
                                cursor-pointer 
                                hover:-translate-y-1 hover:scale-90 overflow-hidden rounded-2xl" id="cards">
                                    <canvas ref="barChartRef" id="BarChart" height="500" class="pb-4 md:w-[800px] w-[500px]"></canvas>
                                </div>
                                <div class="first-card first-letter:bg-sky-900 flex flex-col justify-center items-center text-center md:h-80 h-72
                                cursor-pointer bg-white
                                hover:-translate-y-1 hover:scale-90 overflow-hidden rounded-xl" id="cards">
                                    <canvas ref="pieChartRef" id="PieChart" height="400" class="pb-4 md:w-[800px] w-[500px]"></canvas>
                                </div>
                            </div>
                        </div><!-- End of graph-content -->
                    </div><!-- End of graph-container -->

                    <div class="table-container">
                        <div class="table-content">
                            <table id="main-table">
                                <caption>CHAIRPERSONS</caption>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Department</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Eric Redolosa</td>
                                        <td>ericredolosa@gmail.com</td>
                                        <td>BSHM</td>
                                        <td>Active</td>
                                        <td><button type="button" id="modify" name="modify">Modify<i class="bi bi-pencil-square"></i></button></td>
                                    </tr>
                                    <tr>
                                        <td>Lenner Jay Soliano</td>
                                        <td>lennerjaysoliano@gmail.com</td>
                                        <td>BSED</td>
                                        <td>Active</td>
                                        <td><button type="button" id="modify" name="modify">Modify<i class="bi bi-pencil-square"></i></button></td>
                                    </tr>
                                    <tr>
                                        <td>Ranel Soliano</td>
                                        <td>ranelsoliano@gmail.com</td>
                                        <td>BSIT</td>
                                        <td>Active</td>
                                        <td><button type="button" id="modify" name="modify">Modify<i class="bi bi-pencil-square"></i></button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><!-- End of table-content -->
                    </div><!-- End of table-container -->

                </div><!-- End of dashboard-content -->
        </div><!-- End of dashboard-body-container -->

        <div style="margin-bottom: 100px;"></div>
        <!-- PENETRATION TEST -->

            <FooterCard/>
        </div>
   </div>

</template>

<script setup>
    import { useDashboardStore } from '../../stores/dashboard';
    import { useDrawerStore } from '../../stores/drawerStore';
    import { ref,onMounted } from 'vue';
    import FooterCard from '../../components/FooterCard.vue'
    import Chart from 'chart.js/auto';
    import { useAuthStore } from "../../stores/auth";
    import { useDepartmentStore } from "../../stores/department";
    import { useEntityStore } from "../../stores/entity";
    import { useSubjectStore } from "../../stores/subject";
    import { useSectionYearStore } from "../../stores/sectionYear"
    import { useRoleStore } from "../../stores/role";

    const roleStore = useRoleStore();
    const subjectStore = useSubjectStore()
    const sectionYearStore = useSectionYearStore()
    const entityStore = useEntityStore()
    const departmentStore = useDepartmentStore();
    const drawer = useDrawerStore()
    const dashboardStore = useDashboardStore()
    const res = ref([]);
    const store = useAuthStore()
    const barChartRef = ref(null);
    const pieChartRef = ref(null);
    // console.log(store.isLoggedIn)
    // console.log(store.isAdminStaff)


onMounted(async()=>{
    const data = await dashboardStore.fetchAdminDashboardData()
    res.value = dashboardStore.adminData
    console.log(res.value)

    barChartRef.value = new Chart(barChartRef.value, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3], //data pila ka student each section ang mi evaluate
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    pieChartRef.value = new Chart(pieChartRef.value, {
        type: 'doughnut',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Graph of The Student Evaluated',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                    ],
                    hoverOffset: 6
                }]
            }
    });

    if(!localStorage.getItem('departments')){
        departmentStore.getDepartments();
    }
    if(!localStorage.getItem('entities')){
        entityStore.fetchAllEntity();
    }
    if(!localStorage.getItem('subjects')){
        subjectStore.fetchAllSubjects()
    }
    if(!localStorage.getItem('sectionYears')){
        sectionYearStore.fetchAllSectionYears()
    }
    if(!localStorage.getItem('roles')){
        await roleStore.fetchAllRoles();
    }

})

</script>

<style scoped>

    .header-container {
        width: 100%;
        margin: auto;
        /* background-color: #28C66F; */
        /* background-color: #F0F2FA; */
    }

    .header-container #main-header {
        width: 90%;
        margin: auto;
        padding: 15px 15px;
        text-align: center;
        background-color: #ffffff;
        color: #000000;
    }

    #main-header .burger-container i {
        background-color: #cccccc;
    }

    #main-header .main-content h1 {
        font-size: 22px;
        font-family: Helvetica, Georgia, "Times New Roman";
        font-weight: bold;
    }

    #main-header .main-content p {
        font-size: 14px;
        font-family: Helvetica, Georgia, "Times New Roman";
    }

    .dashboard-body-container {
        background-color: #F0F2FA;
        width: 100%;
        margin: auto;
    }

    .overview h2 {
        font-size: 18px;
        font-family: Helvetica, Georgia, "Times New Roman";
        font-weight: bold;
        position: relative;
        top: 30px;
        left: 75px;
        color: #A0A0A0;
    }

    .dashboard-content .card-container {
        width: 95%;
        margin: 100px auto 30px auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .card-container .main-card {
        width: 24%;
        margin: auto;
        box-shadow: 1px 1.5px 4px #A0A0A0;
        border-radius: 3px;
    }

    .card-container .students-enrolled {
        background-image: linear-gradient(to right, #C995F8, #BB81F5);
    }

    .card-container .evaluatees-registered {
        background-image: linear-gradient(to right, #59ABE7, #6465D3);
    }

    .card-container .nan {
        background-image: linear-gradient(to right, #FAC093, #F48F92);
    }

    .main-card .card-content {
        padding: 50px 25px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #ffffff;
    }

    .main-card .card-content i {
        font-size: 22px;
    }

    .card-content .description .title {
        font-size: 15px;
    }

    .dashboard-content .graph-container {
        width: 100%;
        margin: 100px auto auto auto;
    }

    .table-container {
        width: 95%;
        margin: auto;
    }

    .table-container .table-content {
        width: 100%;
        margin: auto;
        padding: 8px 15px;
    }

    .table-content #main-table {
        width: 100%;
        margin: 100px auto 100px auto;
        border-collapse: collapse;
    }

    .table-content caption {
        text-align: left;
        font-weight: bold;
        font-size: 16px;
        font-family: Helvetica, Georgia, "Times New Roman";
        margin-bottom: 15px;
        color: #A0A0A0;
    }

    .table-content #main-table tr, th, td {
        border: 1px solid gray;
        padding: 8px;
        text-align: center;
    }

    #main-table th {
        font-size: 15px;
        font-family: Helvetica, Georgia, "Times New Roman";
        background-color: #cccccc;
    }

    #main-table td {
        font-size: 13.5px;
        font-family: Helvetica, Georgia, "Times New Roman";
    }

    #main-table tr:nth-child(odd) {
        background-color: #ffffff;
        color: #000000;
    }

    #main-table td button#modify {
        border: none;
        outline: none;
        border: 1px solid #0C4A6E;
        padding: 8px 12px;
        font-size: 14px;
        font-family: Helvetica, Georgia, "Times New Roman";
        display: block;
        text-align: center;
        border-radius: 3px;
        background-color: #0C4A6E;
        color: #ffffff;
        margin: auto;
    }

    #main-table td button#modify:hover {
        background-color: #ffffff;
        color: #000000;
        border: 1px solid #000000;
        transition: all 0.4s ease 0s;
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        .dashboard-body-container .overview h2 {
            position: relative;
            left: 40%;
        }

        .dashboard-body-container .card-container {
            flex-direction: column;
        }

        .card-container .main-card {
            width: 70%;
            margin: auto auto 15px auto;
        }

        .table-content {
            overflow-x: scroll;
        }
    }

    /* PENETRATION TEST */
    .header-name {
        font-size: 25px;
    }

    .dashboard {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
    }

    .first-container {
        border-radius: 15px;
    }

    .second-container {
        border-radius: 5px;
    }

    .announcement {
        border-radius: 5px;
    }

    .announcements {
        font-family: "Lucida Grande";
    }
    #cards {
        background-color: white;
        box-shadow: 35px 35px 68px 0px rgba(127, 147, 224, 0.2);
        transition: all 0.3s;
    }

    /* #cards:hover {
    box-shadow: 35px 35px 68px 0px rgba(157, 177, 255, 0.5);
    } */

    #cards:active {
        transform: scale(0.95);
        border: 1px solid blue;
    }
        .overflow-auto::-webkit-scrollbar {
        display: none;
        width: 0px;
    }
    .overflow-auto:hover::-webkit-scrollbar {
        display: block;
    }
    .overflow-auto::-webkit-scrollbar-track {
        background-color: transparent;
    }
    .overflow-auto::-webkit-scrollbar-thumb {
        background-color: rgb(8, 47, 73, 1);
        border-radius: 8px;
        width: 4px;
    }

</style>
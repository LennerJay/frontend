import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getAdminDashboardData , getUserDashboardData} from '../http/dashboard-api'


export const useDashboardStore = defineStore('dashboardStore',()=>{

        const adminData = ref();
        const userData = ref();

        const fetchAdminDashboardData = async ()=>{
            const {data} = await getAdminDashboardData()
            adminData.value = data
        }

        const fetchUserDashboardData = async ()=>{
            const {data} = await getUserDashboardData()
            return data;
        }


    return {
        adminData,
        userData,
        fetchAdminDashboardData,
        fetchUserDashboardData
    }
});
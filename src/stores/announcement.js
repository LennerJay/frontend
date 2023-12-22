import { addAnouncement,fetchAllAnouncements,fetchLatestAnouncement,updateAnnouncement,deleteAnnouncement,updateStatusAnnouncement} from '../http/announcement-api'
import { csrfCookie } from '../http/auth-api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnnouncementStore = defineStore('announcementStore',()=>{
    const announcements = ref([]);
    const isSuccess = ref(false)
    const errors = ref([])
    const latestAnnouncement = ref([])


    const saveAnnouncement = async(val)=>{
       await csrfCookie()
       try {
        const {data} = await addAnouncement({announcement: val});
        if(data.success){
            isSuccess.value = true;
            announcements.value.push(data.data)
          
        }else{
            isSuccess.value = false;
        }
        errors.value = []
    } catch (error) {
        errors.value = error
    }
    }

    const getAllAnnouncements = async()=>{
        try {
            const {data} = await fetchAllAnouncements();
            if(data.success){
                isSuccess.value = true;
                announcements.value = data.data.map((item) => {
                    return { id: item.id, name: item.announcement };
                  });
            }else{
                isSuccess.value = false;
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }


    const getLatestAnnouncements = async()=>{
        try {

            const {data} = await fetchLatestAnouncement();
            if(data.success){
                isSuccess.value = true;
                latestAnnouncement.value = data.data
            }else{
                isSuccess.value = false;
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }

    const saveUpdateAnnouncements = async(id,val)=>{
        await csrfCookie()
        try {
            const {data} = await updateAnnouncement(id,{announcement:val});
            if(data.success){
                isSuccess.value = true;
            }else{
                isSuccess.value = false;
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }

    }

    const deleteAnnouncements = async(id)=>{
        await csrfCookie()
        try {
            const {data} = await deleteAnnouncement(id)
            if(data.success){
                isSuccess.value = true;
                announcements.value = announcements.value.filter(item => item.id != id);
            }else{
                isSuccess.value = false;
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }

    const updateStatusAnnouncements = async(id)=>{
        await csrfCookie()
        try {
             const {data} = await updateStatusAnnouncement(id)
            if(data.success){
                isSuccess.value = true;
            }else{
                isSuccess.value = false;
            }
            errors.value = []
        } catch (error) {
            errors.value = error
        }
    }
    



    return {
        saveAnnouncement,
        announcements,
        errors,
        isSuccess,
        getAllAnnouncements,
        getLatestAnnouncements,
        saveUpdateAnnouncements,
        deleteAnnouncements,
        updateStatusAnnouncements
    }
}) 

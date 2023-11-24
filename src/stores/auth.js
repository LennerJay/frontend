import { defineStore } from 'pinia';
import { computed, ref,watch } from 'vue';
import {  csrfCookie, login, logout, getUser,getUserInfo ,test,testCreateApi} from '../http/auth-api';


export const useAuthStore = defineStore('authStore', ()=>{
    const user = ref({})
    const errors = ref({})
    const isAdminStaff = ref(false)
    // const isLoggedIn = computed(()=> !!user.value)
    const isLoggedIn = ref(false)
    const token = ref([]);

  if(localStorage.getItem('jwt_token')){
      isLoggedIn.value = true;
      const tmp = localStorage.getItem('jwt_token')
      isAdminStaff.value = atob(tmp.split('.')[1]) === 'admin';
  }else{
    isLoggedIn.value = false;
  }
  watch(
    token,
    (tokenVal)=>{
      localStorage.setItem('jwt_token', tokenVal +'.'+ btoa(user.value.role.name)) 
    }
  );
  
    const fetchUser = async ()=>{
      const {data,status}  = await getUser();
    
      if(status === 200){
        user.value = await data;
      }else{
        errors.value = data
      }
    }
    
    const handleLogin = async (credentials) => {
        await csrfCookie();
        try {
            const res = await login(credentials);
            if(res.status === 200){
              isLoggedIn.value = true;
              token.value = res.data.token  ;
              user.value = res.data.user ;
              isAdminStaff.value = user.value.role.name ==='admin'
            }
            console.log(res)
        } catch (error) {
           if(error.response.status == 422){
            errors.value =  error.response.data.errors
           }else{
            errors.value =  error.response
           }
           console.log(errors.value)
        }

    };



    const handleLogout = async() => {
        // csrfCookie()
        await logout()
        user.value = null
        isAdminStaff.value = null
    };

    const fetchUserInfo = async(id) =>{
      const user = {
        id_number: id,
      }
      const {data} = await getUserInfo(user);
      return data;
    }

    const testApi = async () => {
      const {data}  = await test();
      return data;  
    }

    const testCreate = async(val)=>{
      const res = await testCreateApi(val);
      console.log(res);
    }
    return{
      testCreate,
      testApi,
      fetchUserInfo,
      user, 
      errors, 
      isAdminStaff,
      isLoggedIn,
      fetchUser,
      handleLogin,
      handleLogout
    }
});
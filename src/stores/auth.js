import { defineStore ,getActivePinia  } from 'pinia';
import { computed, ref,watch } from 'vue';
import { storeUserInfo, csrfCookie, login, logout, getUser,getUserInfo} from '../http/auth-api';


export const useAuthStore = defineStore('authStore', ()=>{
    const user = ref([])
    const errors = ref([])
    const isAdminStaff = ref(false)
    const isLoggedIn = ref(false)
    const token = ref([]);
    const userInfo = ref([]);
    const isSuccess = ref(false)

  if(localStorage.getItem('jwt_token')){
      isLoggedIn.value = true;
      const tmp = localStorage.getItem('jwt_token')
      isAdminStaff.value = atob(tmp.split('.')[1]) === 'admin';
  }else{
    localStorage.clear();
    isLoggedIn.value = false;
    isAdminStaff.value = false;
  }
  watch(
    token,
    (tokenVal)=>{
      localStorage.setItem('jwt_token', tokenVal + '.' + btoa(user.value.role.name)) 
    }
  );
  
    const fetchUser = async ()=>{
      try{
        const {data,status}  = await getUser();
        user.value = data
        errors.value = []
      }catch(e){
        errors.value = e
        user.value = []
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
              isAdminStaff.value = user.value.role.name === 'admin'
              errors.value = [];
            }
      
        } catch (error) {
          isLoggedIn.value = false;
           if(error.response.status == 422){
            errors.value =  error.response.data.errors
           }else{
            errors.value =  error.response
           }
        }

    };
    const handleLogout = async() => {
        await csrfCookie()
        await logout()
        const pinia = getActivePinia()
        pinia._s.forEach((store) => store.$reset())
    };

    const fetchUserInfo = async(id) =>{
      const user = {
        id_number: id,
      }

      try{

        const {data} = await getUserInfo(user);
        if(data.success){
          isSuccess.value = true;
          userInfo.value = data.data
        }else{
          isSuccess.value = false;
        }

        errors.value = []
      } catch($e){
        userInfo.value = []
        errors.value = $e
      }

    }

    const filterSchedule = () => {
      const keySelector1 =  (klass) => klass.department
      const keySelector2 =  (klass) => klass.section_year
      const studentClasses = [];

      const klasses =  userInfo.value.classes.reduce(function (accumulator, current) {
          const key = keySelector1(current);
          (accumulator[key] = accumulator[key] || []).push(current);
          return accumulator;
        }, {});
        for (const klass in klasses) {
          const newValue = klasses[klass].reduce(function (accumulator, current) {
              const key = keySelector2(current);
              (accumulator[key] = accumulator[key] || []).push(current);
              return accumulator;
            }, {});
          studentClasses.push({
              department: klass,
              classes: newValue,
          });
        }

        return studentClasses;
  }

  const saveUserInfo = async(val)=>{
      try {
        const {data} = await storeUserInfo(val);
        if(data.success){
          isSuccess.value = true;
          userInfo.value = data.data
        }else{
          isSuccess.value = false;
        }

        errors.value = []
      } catch (error) {
        errors.value = error
      }
  }

  const changePassword = async()=>{

  }
    return{
      changePassword,
      saveUserInfo,
      fetchUserInfo,
      userInfo,
      user, 
      errors, 
      isAdminStaff,
      isLoggedIn,
      fetchUser,
      handleLogin,
      handleLogout,
      filterSchedule,
      isSuccess,
    }
});
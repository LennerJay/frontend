import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import {  csrfCookie, login, register, logout, getUser } from '../http/auth-api';


export const useAuthStore = defineStore('authStore', ()=>{
    const user = ref({})
    const errors = ref({})
    const isAdminStaff = ref()
    const isLoggedIn = computed(()=> !!user.value)
    
    const fetchUser = async ()=>{
      try{
          const {data}  = await getUser();
          user.value =  data
          isAdminStaff.value =  user.value.roles.some(role => role.name === 'admin' || role.name ==='staff')
      }catch(error){
        user.value = null
        errors.value =  error.response
      }
    }

    const handleLogin = async (credentials) => {
      await csrfCookie();
        try {
            await login(credentials);
            await fetchUser();
            errors.value= {};
        } catch (error) {
           if(error.response.status === 422){
            errors.value =  error.response.data.errors
           }else{
            errors.value =  error.response
           }
        }

    };

    const handleRegister = async (newUser) => {
        try {
          await register(newUser);
          await handleLogin({
            email: newUser.email,
            password: newUser.password,
          });
        } catch (error) {
          if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors;
          }
        }
      };

    const handleLogout = async() => {
        await logout()
        user.value = null
    };

    return{
        user, errors, isAdminStaff,isLoggedIn,fetchUser, handleLogin, handleRegister, handleLogout
    }
});
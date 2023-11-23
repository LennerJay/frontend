import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach(async (to,from)=>{


    const store = useAuthStore();

  console.log(store.isLoggedIn)
  console.log(store.isAdminStaff)
      if(to.meta.auth && !store.isLoggedIn){
        return{
            name:'login',
        }
        
      } else if (to.meta.guest && store.isLoggedIn) {
        return { name: "dashboard" };
      } else if (to.meta.admin && !store.isAdminStaff) {
        return { name: "dashboard" };
      } else if(!to.meta.admin && store.isAdminStaff){
        return { name: "admin" };
      }


      
});

export default router

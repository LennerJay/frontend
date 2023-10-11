import Dashboard from '../views/Dashboard.vue'
import NotFoundErrorPage from '../views/NotFoundErrorPage.vue'


const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta:{
          auth:true
        }
      },
      {
        path:'/login',
        name: 'login',
        meta:{
          guest:true
        },
        component: () => import('../views/Login.vue'),
      },
      // {
      //   path:'/register',
      //   name: 'register',
          // meta:{
          //   guest:true
          // },
      //   component: () => import('../views/Register.vue'),
      // },
      {
        path: '/evaluation',
        name: 'evaluation',
        component: () => import('../views/Evaluation.vue'),
        meta:{
          auth:true
        }
      },
      {
        path:'/profile',
        name: 'profile',
        component: () => import('../views/Profile.vue'),
        meta:{
          auth:true
        }
      },
      {
        path:'/test',
        name: 'test',
        component: () => import('../views/test.vue'),
      },

      {
        path:'/:notFound(.*)',
        name:'error.404',
        component:NotFoundErrorPage
      }
]



export default routes;
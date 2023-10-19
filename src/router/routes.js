import Dashboard from '../views/Dashboard.vue'
import NotFoundErrorPage from '../views/NotFoundErrorPage.vue'
import Login from '../views/Login.vue'
import Evaluation from '../views/Evaluation.vue'
import Profile from '../views/Profile.vue'


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
        component: Login,
      },
      {
        path: '/evaluation',
        name: 'evaluation',
        component: Evaluation,
        meta:{
          auth:true
        }
      },
      {
        path:'/profile',
        name: 'profile',
        component: Profile,
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
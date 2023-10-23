import Dashboard from '../views/Dashboard.vue'
import NotFoundErrorPage from '../views/NotFoundErrorPage.vue'
import Login from '../views/Login.vue'
import Evaluation from '../views/Evaluation.vue'
import Profile from '../views/Profile.vue'
import History from '../views/History.vue'
import AdminDashboard from '../views/AdminDashboard.vue'


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
        path:'/history',
        name: 'history',
        component: History,
        meta:{
          auth:true
        }
      },
      {
        path:'/admin',
        name: 'admin',
        component: AdminDashboard,
        meta:{
          auth:true
        }
      },
      {
        path:'/ratings',
        name: 'ratings',
        component: ()=> import('../views/Ratings.vue'),
        meta:{
          auth:true
        }
      },
      {
        path:'/question-form',
        name: 'question-form',
        component: ()=> import('../views/QuestionForm.vue'),
        meta:{
          auth:true
        }
      },
      {
        path:'/students',
        name: 'students',
        component: ()=> import('../views/StudentList.vue'),
        meta:{
          auth:true
        }
      },

      {
        path:'/:notFound(.*)',
        name:'error.404',
        component:NotFoundErrorPage
      }
]



export default routes;
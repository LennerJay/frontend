import Dashboard from '../views/user/Dashboard.vue'
import NotFoundErrorPage from '../views/NotFoundErrorPage.vue'
import Login from '../views/Login.vue'
import Evaluation from '../views/user/Evaluation.vue'
import Profile from '../views/user/Profile.vue'
import History from '../views/user/History.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'


const routes = [
      {
        path:'/login',
        name: 'login',
        meta:{
          guest:true
        },
        component: Login,
        alias: '/'
      },
      {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta:{
            auth:true
        },
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
          auth:true,
          admin:true
        }
      },
      {
        path:'/ratings',
        name: 'ratings',
        component: ()=> import('../views/admin/Ratings.vue'),
        meta:{
          auth:true,
          admin:true
        }
      },
      {
        path:'/question-form',
        name: 'question-form',
        component: ()=> import('../views/admin/QuestionForm.vue'),
        meta:{
          auth:true,
          admin:true
        }
      },
      {
        path:'/users-list',
        name: 'users-list',
        component: ()=> import('../views/admin/UserList.vue'),
        meta:{
          auth:true,
          admin:true
        }
      },
      {
        path:'/evaluatees',
        name: 'evaluatees',
        component: ()=> import('../views/user/Evaluatees.vue'),
        meta:{
          auth:true
        }
      },
      {
        path:'/evaluatees-list',
        name: 'evaluatees-list',
        component: ()=> import('../views/admin/EvaluateesList.vue'),
        meta:{
          auth:true,
          admin:true
        }
      },
      {
        path:'/:notFound(.*)',
        name:'error.404',
        component:NotFoundErrorPage
      }
]



export default routes;
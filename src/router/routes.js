import Dashboard from '../views/user/Dashboard.vue'
import NotFoundErrorPage from '../views/NotFoundErrorPage.vue'
import Login from '../views/Login.vue'
import Evaluation from '../views/user/Evaluation.vue'
import Profile from '../views/user/Profile.vue'
import History from '../views/user/History.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'


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
        path:'/students-list',
        name: 'students',
        component: ()=> import('../views/admin/StudentList.vue'),
        meta:{
          auth:true,
          admin:true
        }
      },
      {
        path:'/instructors',
        name: 'instructors',
        component: ()=> import('../views/user/Instructors.vue'),
        meta:{
          auth:true
        }
      },
      {
        path:'/instructors-list',
        name: 'instructors-list',
        component: ()=> import('../views/admin/InstructorsList.vue'),
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
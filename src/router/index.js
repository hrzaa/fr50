import { createRouter, createWebHistory} from 'vue-router'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'

const history = createWebHistory();

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
   
  }
]
const router = createRouter({
        history,
        routes
    })
    export default router
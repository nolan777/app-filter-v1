import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import User from '../views/User.vue'
import RegisterUser from '../views/RegisterUser.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/users/:id',
    name: 'User',
    component: User,
  },
  {
    path: '/users/add',
    name: 'RegisterUser',
    component: RegisterUser,
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

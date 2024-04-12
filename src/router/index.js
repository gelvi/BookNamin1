import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'

import BookStore from '@/views/BookStorePage.vue'
import BookCart from '@/views/BookCartPage.vue'    
import { store } from '@/store/store.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: (to, from, next) => {
      const loggedInUser =store.state.users.find(user => user.isloggedIn === true);
      if (!loggedInUser) {
        next(); // Allow navigation to the login page if no user is logged in
      } else {
        // Redirect to home or any other route if the user is already logged in
        next({ name: 'home' });
      }
    }

  },
  {
    path: '/bookStore',
    name: 'books',
    component: BookStore,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/bookCart',
    name: 'cart',
    component: BookCart,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


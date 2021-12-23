import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomePage.vue'
import About from '../views/AboutPage.vue'
import Games from '../views/GamesPage.vue'
import Cartoon from '../views/CartoonPage.vue'
import GameMainPage from '../views/GameMainPage.vue'

// always tell vue to use the router otherwise no point defining the router array
Vue.use(VueRouter)
// router array
const routes = [
  // import every single element aka "page" in the array
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path:"/games/:key",
    name:"GameMainPage",
    component:GameMainPage
  },
  {
    path: '/games',
    name: 'Games',
    component: Games,
  },
  {
    path: '/:key',
    name: 'Cartoon',
    component: Cartoon,
  }
]

// call the router
const router = new VueRouter({
  routes,
  // history mode allows user to use the "back" button
  mode: 'history',
})

export default router

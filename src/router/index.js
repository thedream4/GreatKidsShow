import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomePage.vue'
import About from '../views/AboutPage.vue'
import Games from '../views/GamesPage.vue'
import Fruits from '../views/FruitsPage.vue'
import Vegetables from '../views/VegetablesPage.vue'
import Sushi from '../views/SushiPage.vue'
import Animals from '../views/AnimalsPage.vue'
import Hobbies from '../views/HobbiesPage.vue'

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
    path: '/games',
    name: 'Games',
    component: Games,
  },
  {
    path: '/fruits',
    name: 'Fruits',
    component: Fruits,
  },
  {
    path: '/vegetables',
    name: 'Vegetables',
    component: Vegetables,
  },
  {
    path: '/sushi',
    name: 'Sushi',
    component: Sushi,
  },
  {
    path: '/animals',
    name: 'Animals',
    component: Animals,
  },
  {
    path: '/hobbies',
    name: 'Hobbies',
    component: Hobbies,
  },
]

// call the router
const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router

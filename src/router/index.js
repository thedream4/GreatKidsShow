import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blog from '../views/Blog.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
// always tell vue to use the router otherwise no point defining the router array
Vue.use(VueRouter)
// router array 
const routes = [
  // import every single element aka "page" in the array
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
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/PageOne',
    name: 'PageOne',
    component: PageOne
  },
  {
    path: '/PageTwo',
    name: 'PageTwo',
    component: PageTwo
  },
];

// call the router
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

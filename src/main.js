import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionAPI from '@vue/composition-api'

// you can import anything here: bootstrap, css, libraries...
import BootstrapVue from 'bootstrap-vue' // Bootstrap component library
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueMaterial from 'vue-material'; //ripple effect
import 'vue-material/dist/vue-material.min.css'

import AOS from 'aos'; //scroll animation
import 'aos/dist/aos.css';

// disable the "development mode" warning on console
Vue.config.productionTip = false

// use the imported libraries 
Vue.use(VueCompositionAPI)
Vue.use(BootstrapVue);
Vue.use(VueMaterial)
AOS.init()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// Code is like humor. 
// When you have to explain it, 
// it’s bad – Cory House
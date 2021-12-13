import Vue from 'vue'
import App from './App.vue'
import router from './router'
// you can import anything here: bootstrap, css, libraries...
import VueMaterial from 'vue-material'; //component library
import 'vue-material/dist/vue-material.min.css' //component library minified
import AOS from 'aos'; //scroll animation
import 'aos/dist/aos.css'; //scroll animation minified

// disable the "development mode" warning on console
Vue.config.productionTip = false

// use the imported libraries 
Vue.use(VueMaterial)
AOS.init()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// Code is like humor. 
// When you have to explain it, 
// it’s bad – Cory House
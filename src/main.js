import Vue from 'vue'
import App from './App.vue'
import router from './router'
// you can import anything here: bootstrap, css, libraries...
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css' // enables dark & light theme
// To-install: animate (navigation animation), aos (scroll animation)

Vue.config.productionTip = false
Vue.use(VueMaterial)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
// you can import anything here: bootstrap, css, libraries...
// import BootstrapCarousels from ''

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

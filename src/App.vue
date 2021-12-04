<template>
  <div id="app">
    <nav-bar style=""></nav-bar>
    <router-view class="views"/>
  </div>
</template>

<script>
import NavBar from './components/navbar.vue'
export default {
  components: {
    "nav-bar": NavBar,
  }
};
</script>

<style>
/* default (desktop) viewport */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.views{
  margin-right:20%;
}

/* phone viewport */
@media screen and (max-width: 480px) { 
  .views{
    margin-right:0;
  }
}
</style>

<template>
  <div id="app">
    <nav-bar style=""></nav-bar>
    <router-view class="views" />
  </div>
</template>

<script>
import NavBar from "./components/Navbar.vue";
export default {
  components: {
    "nav-bar": NavBar,
  },
};
</script>

<style>
/* styles applies in App.vue will be applied globally across all pages and components */
/* default (desktop) viewport */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.views {
  margin-right: 20%;
}

video {
  /* margin-left: 5%;
  margin-right: 5%;
  width: 90%; 100% - 10% because margin-left and margin-right 5% each */
  width:100%;
  border: 10px solid pink; /* overwrite the border color in scoped css */
}

/* phone viewport */
@media screen and (max-width: 480px) {
  .views {
    margin-right: 0;
  }
}
</style>

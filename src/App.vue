<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view class="views" />
  </div>
</template>

<script>
import NavBar from "./components/navbar.vue";
export default {
  components: {
    "nav-bar": NavBar,
  },
  // uncomment line 16-18 before submission
  // alert will be called everytime the app refreshes
  // created: () => {
  //   alert("Let's Explore!");
  // },
};
</script>

<style>
/* styles applied in App.vue will be applied globally across all pages and components */
/* default (desktop) viewport */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1, h2, h3, h4, h5{
  margin: 0;
  font-family:cursive;
}
.views {
  padding-right: 10%;
}

/* CODE FOR SCROLLING GALLERY */
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
::-webkit-scrollbar {
  display: none;
}
.viewport {
  width: 100%;
  overflow: scroll;
  padding: 5px;
}
/* END CODE FOR SCROLLING GALLERY */
video {
  width: 70%;
}

@media screen and (max-width: 1000px) {
  video {
  width: 100%;
}
}

/* phone viewport */
@media screen and (max-width: 480px) {
  .views {
    padding-right: 0;
  }
  video{
    width:100%;
    padding:0;
  }
}
</style>

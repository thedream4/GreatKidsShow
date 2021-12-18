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
h1 {
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
.card-m {
  margin-right: 10px;
  border: 1px solid gray;
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px;
  box-shadow: 2px 2px 3px black;
  min-width: 25vw;
  min-height: 300px;
}

img {
  border-radius: 15%;
  width: 100%;
  /* max-height: 40vh; */
}
/* END CODE FOR SCROLLING GALLERY */

video {
  width: 100%;
}

/* phone viewport */
@media screen and (max-width: 480px) {
  .views {
    padding-right: 0;
  }
  .card-m {
    margin-right: 10px;
    min-width: 40vw;
    min-height: 30vh;
  }
}
</style>

<template>
  <section v-if="validKey">
    <img  :src="cover(data.background)"  alt="background image"  class="bg-img"  data-aos="fade-down"  data-aos-duration="1500"  />
    <!-- .col1 is the navbar at the left of desktop vp / bottom of phone vp -->
    <div class="col1" data-aos="slide-right" data-aos-duration="1500">
      <!-- for each trivia in in the json database that is imported,
      loop through and create a button for each -->
      <button v-for="(trivia,index) in data.trivias" v-bind:key="index" v-on:click="switchTrivia(index), emitSound('http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3')">
        <img :src="cover(trivia.icon)" alt="icon"/>
      </button>
    </div>
    <!-- .col2 is the content area where the cartoon video and trivia card
    is rendered based on what user click in .col1-->
    <div class="col2" data-aos="zoom-in" data-aos-duration="1500">
      <h1>
        <b>{{ data.title.toUpperCase() }}</b>
      </h1>
      <video controls :poster="cover(data.thumbnail)" :key="data.route">
        <source :src="video_url" :type="video_mime" />
      </video>
      <!-- TRIVIA CARD COMPONENT START HERE -->
      <hr />
      <TriviaCard style="display: flex; justify-content: space-around" ref="card" :trivia="data.trivias[0]"/>
      <hr />
      <!-- TRIVIA CARD COMPONENT END HERE -->

      <!-- how to toggle visibility when user click the "DO NOT CLICK" button -->
      <doNotClick ref="dont_click_modal" :key="$route.params.key"/>
    </div>
  </section>
  <section v-else>
    <div class="col2">Url /{{ $route.params.key }} is not existant</div>
  </section>
</template>

<script>
//import cartoonData
import cartoonData from "../data/featuredCartoon.json";
import TriviaCard from "../components/TriviaCard.vue";
import doNotClick from "../components/ModalDoNotClick.vue";

export default {
  name: "CartoonPage",
  components: {
    TriviaCard,
    doNotClick,
  },
  computed: {
    validKey: function () {
      for (let i = 0; i < cartoonData.length; i++) {
        const d = cartoonData[i];
        if (d.route === this.$route.params.key) {
          return true;
        }
      }
      return false;
    },
    data: function () {
      for (let i = 0; i < cartoonData.length; i++) {
        const d = cartoonData[i];
        if (d.route === this.$route.params.key) {
          return d;
        }
      }
      return 0;
    },
    video_url: function () {
      let url = this.data.video;
      try {
        if (url.length > 0) url = require("@/assets/" + url); // match the url and use that video
      } catch (e) {
        url = ""; //return empty url in case it is inexistant
      }
      return url;
    },
    video_mime: function () {
      const url = this.video_url;
      let mime = ""; //empty mime force browser to automatically infer
      //for now just construct the mime from the file extension
      if (url.length > 0) {
        const dots = url.split(".");
        mime = `video/${dots[dots.length - 1]}`;
      }
      return mime;
    },
  },
  methods: {
    // "methods" is another word for "functions" in vue
    cover(url) {
      if (url !== "") {
        //url not empty
        try {
          url = require("@/assets/" + url); // check for matching path url and use that image
        } catch (e) {
          url = require("@/assets/default.jpg"); // use a default image if error
        }
      } else url = require("@/assets/default.jpg"); // use a default image if url empty
      return url;
    },
    switchTrivia(idx){
      if(idx>=this.data.trivias.length){
        return; //ignore invalid index
      }
      else if(idx===this.data.trivias.length-1){
        //last index was the DON'T CLICK BUTTON
        this.dontClick_hit();
      }
      else{
        this.$refs.card.trivia=this.data.trivias[idx]; //programmatically update the object LOL
      }
    },
    emitSound (sound) {
      if(sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    dontClick_hit(){
      this.$refs["dont_click_modal"].shown=false;
      this.$refs["dont_click_modal"].shown=true;
    }
  },
};
</script>

<style scoped>
.bg-img {
  border-radius: 0%;
  position: fixed;
  z-index: -1;
  object-fit: cover;
  height: 100vh;
  width: 100vw;
}
section {
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  display: flex;
  height: 100vh;
}
.col1 {
  position: fixed;
  height: 100vh;
  width: 20vw;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.col2 {
  width: 80vw;
  margin-left: 20vw; /* width of .col1 */
}
.card{
margin:auto;
width:70%;
height: 30vh;
}
button {
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 1px 2px 3px gray;
  height:10%;
}
button>img{
  height:100%;
}
@media screen and (max-width: 1000px) {
  .card{
    margin:0;
    width:100%;
    height:auto;
  }
  h3{
    display:block;
  }
}
@media screen and (max-width: 600px) {
  section {
    display: block;
  }
  video {
    width: 100vw;
  }
  .col1 {
    display: flex;
    flex-direction: row;
    /* flex-wrap: wrap; */
    height: 10vh;
    bottom: 0;
    z-index: 500;
    width: 100%;
    /* background-color: white; */
  }
  .col2 {
    margin: 0;
    width: 100vw;
    padding-bottom: 15vh; /* height of .col1 */
  }
  button{
    width:10vw;
    height:5vh;
  }

}
</style>

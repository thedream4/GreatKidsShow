<template>
  <section v-if="validKey">
    <img
      :src="cover(data.background)"
      alt="background image"
      class="bg-img"
      data-aos="fade-down"
      data-aos-duration="1500"
    />
    <div
      class="col1"
      data-aos="slide-right"
      data-aos-duration="1500"
    >
    <md-button v-for="trivia in this.data.trivias" v-bind:key="trivia.id">
      {{trivia.title}}
    </md-button>
    </div>

    <div class="col2" data-aos="zoom-in" data-aos-duration="1500">
      <h1>
        <b>{{ data.title.toUpperCase() }}</b>
      </h1>
      <video controls :poster="cover(data.thumbnail)">
        <source :src="video_url" :type="video_mime" />
      </video>
      <hr />
      <TriviaCard style="display: flex; justify-content: space-around" />
      <hr />
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

export default {
  name: "CartoonPage",
  components: {
    TriviaCard,
  },
  data() {
    return {
      cartoons: cartoonData,
    };
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
}
.col2 {
  width: 80vw;
  margin-left: 20vw; /* width of .col1 */
}

@media screen and (max-width: 600px) {
  section {
    display: block;
  }
  video {
    width: 100vw;
  }
  .col1 {
    margin: 0;
    height: 15vh;
    width: 100vw;
    bottom: 0;
    z-index: 500;
    background-color: white;
  }
  .col2 {
    margin: 0;
    width: 100vw;
    padding-bottom: 15vh; /* height of .col1 */
  }
}
</style>

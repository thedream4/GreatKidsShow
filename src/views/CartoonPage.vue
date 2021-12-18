<template>
  <section>
    <img :src="cover(data.background)" alt="background image" id="bg-img" />
    <div class="col1">
      <p>
        Nav (pseudocode)
        <br />
        for each item in the trivia array, loop to display the nav link
        <br />
        on click of the navlink, dynamically render the content of trivia card
        <br />
        bootstrap reusable tab component? jQuery show/hide divs?
      </p>
    </div>

    <div class="col2">
      <div>
        <div v-if="validKey">
          <h1>
            <b>{{ data.title.toUpperCase() }}</b>
          </h1>
          <video controls>
            <source :src="video_url" :alt="data.title" type="video/mp4" />
            <source :src="video_url" :alt="data.title" type="video/avi" />
          </video>
        </div>
        <div v-else>
          Url /{{ $route.params.key }} is not existant
          {{ validKey }}
        </div>
      </div>
      <div>
        <p>
          <b> //TODO: find in bootstrap library for a card component </b>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          molestiae architecto! Quisquam explicabo quaerat, vitae quis vel velit
          voluptate! Repellendus sint quibusdam aliquam debitis saepe
          exercitationem, quia optio sit minus consequuntur. Obcaecati numquam
          neque maiores nulla pariatur quo nisi expedita debitis sed, vero sit
          eum. Quidem ratione ipsa eligendi illo inventore neque! Aperiam quasi
          rem porro aliquid illo, autem modi tempore eius voluptate! At
          voluptatem deleniti exercitationem sunt provident quos maiores.
          Excepturi beatae laboriosam eveniet iure, enim harum aspernatur porro
          laudantium laborum eius error quas? Libero beatae delectus aliquid
          incidunt vero necessitatibus eius amet itaque magnam iste maiores,
          voluptatibus culpa.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
//import cartoonData
import cartoonData from "../data/featuredCartoon.json";

export default {
  name: "CartoonPage",
  computed:{
    validKey:function(){
    for(let i=0;i<cartoonData.length;i++){
        const d=cartoonData[i];
        if(d.route===this.$route.params.key){
          return true;
        }
      }
      return false;
    },
    data:function(){
      for(let i=0;i<cartoonData.length;i++){
        const d=cartoonData[i];
        if(d.route===this.$route.params.key){
          return d;
        }
      }
      return 0;
    },
    video_url: function () {
      let url = this.data.video;
      try {
        url = require("@/assets/" + url); // match the url and use that image
      } catch (e) {
        url = require("@/assets/default.jpg"); // use a default image if error
      }
      return url;
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
#bg-img {
  border-radius: 0%;
  position: fixed;
  left: 0;
  z-index: -1;
  object-fit: cover;
  height: 100vh;
}
section {
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  display: flex;
  height: 100vh;
}
.col1 {
  width: 20vw;
  background-color: rgba(255, 255, 255, 0.5);
}
.col2 {
  width: 80vw;
  margin-left: 10%;
  margin-right: 10%;
}

@media screen and (max-width: 1000px) {
  .col1,
  .col2 {
    margin: 0;
  }
}
@media screen and (max-width: 600px) {
  section {
    display: block;
  }
  .col1,
  .col2 {
    width: 100vw;
  }
  .col1 {
    position: fixed;
    bottom: 0;
  }
  video {
    width: 100%;
  }
}
</style>

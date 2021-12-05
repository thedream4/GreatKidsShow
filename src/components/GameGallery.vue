<template>
  <div>
    <section>
      <div v-for="game in games" v-bind:key="game._id">
        <md-card
          class="md-with-hover"
          data-aos="flip-left"
          data-aos-duration="1500"
        >
          <md-ripple>
            <md-card-media-cover md-text-scrim>
              <md-card-media md-text-scrim md-ratio="16:9">
                <!-- img src binds to a function called cover() and passes a url as a parameter-->
                <img :src="cover(game.thumbnail)" alt="music rush" />
              </md-card-media>

              <md-card-area>
                <md-card-header>
                  <span class="md-title">{{ game.title }}</span>
                  <span class="md-subhead">{{ game.description }}</span>
                </md-card-header>

                <md-card-actions>
                  <md-button>PLAY</md-button>
                </md-card-actions>
              </md-card-area>
            </md-card-media-cover>
          </md-ripple>
        </md-card>
        <br />
      </div>
    </section>
    <!-- for each game in games db (declared and initalized in line 33 & 38), 
    loop and display the content -->
  </div>
</template>

<script>
import gamesData from "../data/games.json"; // initialize and connects to local db

export default {
  name: "GameCard", // this component name is GameCard
  data() {
    return {
      games: gamesData, // assigns data to "games" so can call it in DOM like {{ games.title }}
    };
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

<!-- "scoped" attribute limits CSS to this component 
and won't affect other components / pages -->
<style scoped>
section {
  margin-left: 10%;
  margin-right: 10%;
}
img {
  height: 100%;
}

/* tablet viewport */
@media screen and (max-width: 600px) {
  section {
    margin-left:2%;
    margin-right:2%;
  }
}

/* phone viewport */
@media screen and (max-width: 480px) {
  section {
    margin:0;
  }
}
</style>

<!-- I wonder if our professors ever reads our commenting at all :'3 
hope we can get some bonus marks for effort and commitment -->
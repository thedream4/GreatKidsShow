<template>
  <div>
    <div v-for="game in games" v-bind:key="game._id">
      <md-card class="md-with-hover">
        <md-ripple>
          <md-card-media-cover md-text-scrim>
            <md-card-media md-text-scrim md-ratio="16:9">
                <img v-if="game._id=1" src="../assets/SnakesAndLadderThumbnail.jpg" alt="snakes and ladder" />
                <img v-else src="../assets/MusicRushThumbnail.jpg" alt="music rush">
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
  </div>
</template>

<script>
import gamesData from "../data/games.js";

export default {
  name: "GameCard",
  data() {
    return {
      games: gamesData,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: 100%;
  /* width: 100%; */
}
</style>

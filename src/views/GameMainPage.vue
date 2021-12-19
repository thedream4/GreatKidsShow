<template>
  <div v-if="validKey">
    <iframe class="game-frame" :src="data.link"></iframe>
  </div>
  <div v-else>
    <p>Invalid game id</p>
  </div>
</template>

<script>
import gamesData from "../data/games.json"; // initialize and connects to local db

export default {
  name: "GameMainPage", // this component name is GameCard
  computed:{
    validKey: function () {
      for (let i = 0; i < gamesData.length; i++) {
        const d = gamesData[i];
        if (d._id == this.$route.params.key) {
          return true;
        }
      }
      return false;
    },
    data: function () {
      for (let i = 0; i < gamesData.length; i++) {
        const d = gamesData[i];
        if (d._id == this.$route.params.key) {
          return d;
        }
      }
      return 0;
    },
  }
}
</script>
<style scoped>
iframe.game-frame{
  width:100%;
  height:calc(100vh);
}
</style>

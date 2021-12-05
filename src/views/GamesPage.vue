<template>
  <div>
    <h1>This is Games Page</h1>
    <Game1Card />
    <br />
    <Game2Card />
  </div>
</template>

<script>
import Game1Card from "@/components/Game1Card.vue";
import Game2Card from "@/components/Game2Card.vue";

export default {
  name: "GamesPage",
  components: {
    Game1Card,
    Game2Card,
  },
};
</script>

<style>
</style>
<template>
  <div>
    <h1>This is Games Page</h1>
    <GameCards />
  </div>
</template>

<script>
import GameCards from "@/components/GameCards.vue";

export default {
  name: "GamesPage",
  components: {
    GameCards,
  },
};
</script>

<style>
</style>
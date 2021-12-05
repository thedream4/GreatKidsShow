<template>
  <div>
    <h1>This is Games Page</h1>
    <!-- 
      hardcoding the game cards components because my attempt to 
      dynamically render the games from a .JSON / .JS file failed
      
      <GameCards /> component supposed to loop through JSON/js 
      and display the cards accordingly but multiple attempts failed
     -->
    <!-- <GameCards /> -->
    <br>
    <SnakeAndLadderCard />
    <br />
    <MusicRushCard />
  </div>
</template>

<script>
// import GameCards from "@/components/GameCards.vue";
import MusicRushCard from "@/components/MusicRushCard.vue";
import SnakeAndLadderCard from "@/components/SnakeAndLadderCard.vue";

export default {
  name: "GamesPage",
  components: {
    // GameCards,
    MusicRushCard,
    SnakeAndLadderCard,
  },
};
</script>

<style>
</style>
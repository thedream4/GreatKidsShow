<template>
  <div>
    <h1  data-aos="fade-up" data-aos-duration="1500">This is Games Page</h1>
    <GameCards  data-aos="fade-up" data-aos-duration="1500"/>
  </div>
</template>

<script>
import GameCards from "@/components/GameGallery.vue";

export default {
  name: "GamesPage",
  components: {
    GameCards,
  },
};
</script>

<style scoped>
div{
  background-color:beige;
}
</style>
<template>
  <div>
    <h1>HOME</h1>
    <FeaturedVideos />
    <TrendingVideos />
  </div>
</template>

<script>
import FeaturedVideos from "../components/FeaturedVideos.vue";
import TrendingVideos from "../components/TrendingVideos.vue";

export default {
  name: "HomePage",
  components: {
    FeaturedVideos,
    TrendingVideos
  },
};
</script>

<style>
</style>
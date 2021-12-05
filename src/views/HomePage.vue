<template>
  <div>
    <h1>HOME</h1>
    <FeaturedVideos />
    <TrendingVideos />
  </div>
</template>

<script>
import FeaturedVideos from "../components/FeaturedVidGallery.vue";
import TrendingVideos from "../components/TrendingVidGallerys.vue";

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
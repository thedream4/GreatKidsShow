<template>
  <div>
    <h1>HOME</h1>
    <FeaturedVideos />
    <TrendingVideos />
    <br /><br /><br />
  </div>
</template>

<script>
import FeaturedVideos from "../components/FeaturedVidGallery.vue";
import TrendingVideos from "../components/TrendingVidGallery.vue";

// if your crush knows binary
// they'd think you're a 10
// Shon Tzu.K (2021)

export default {
  name: "HomePage",
  components: {
    FeaturedVideos,
    TrendingVideos,
  },
};
</script>

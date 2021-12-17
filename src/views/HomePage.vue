<template>
  <div>
    <h1>HOME</h1>
    <h2><i>☆☆☆ FEATURED ☆☆☆</i></h2>
    <VideoGallery :cartoons="featuredCartoon" />
    <h2><i>☆☆☆ TRENDING ☆☆☆</i></h2>
    <VideoGallery :cartoons="trendingCartoon" />
    <br /><br /><br />
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import VideoGallery from "../components/VideoGallery.vue";
import featuredCartoonData from "@/data/featuredCartoon.json";
import trendingCartoonData from "@/data/trendingCartoon.json";
// if your crush knows binary
// they'd think you're a 10
// Shon Tzu.K (2021)

export default {
  name: "HomePage",
  components: {
    VideoGallery,
  },
  setup() {
    const featuredCartoon = ref(featuredCartoonData);
    const trendingCartoon = ref(trendingCartoonData);
    return { featuredCartoon, trendingCartoon };
  },
};
</script>

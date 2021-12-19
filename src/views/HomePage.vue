<template>
  <div>
    <img src="../assets/bg-garden.png" alt="background image" class="bg-img" data-aos="fade-down" data-aos-duration="1500" />
    <h1 data-aos="fade-up" data-aos-duration="900">HOME</h1>
    <!-- Introduction video -->
    <video controls data-aos="slide-right" data-aos-duration="1500">
      <source src="" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <!-- end introduction video  -->
    <h2 data-aos="fade-up" data-aos-duration="1500"><i>☆☆☆ FEATURED ☆☆☆</i></h2>
    <VideoGallery
      :cartoons="featuredCartoon"
      data-aos="slide-left"
      data-aos-duration="1500"
    />
    <h2 data-aos="fade-up" data-aos-duration="1700"><i>☆☆☆ TRENDING ☆☆☆</i></h2>
    <VideoGallery
      :cartoons="trendingCartoon"
      data-aos="slide-right"
      data-aos-duration="1500"
    />
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

<style scoped>
.bg-img {
  border-radius: 0%;
  position: fixed;
  left: 0;
  z-index: -1;
  object-fit: cover;
  height: 100vh;
  width: 100vw;
}
</style>

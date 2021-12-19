<template>
  <div>
    <img src="../assets/bg-mount.jpg" alt="background image" class="bg-img" data-aos="fade-down" data-aos-duration="1500"  />
    <h1  data-aos="fade-up" data-aos-duration="1500">This is About Page</h1>
    <video controls data-aos="fade-up" data-aos-duration="1500">
      <source src="" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <TeamGallery  data-aos="fade-up" data-aos-duration="1500"/>
  </div>
</template>

<script>
import TeamGallery from "../components/TeamGallery.vue";
// five phases of software development:
// denial, bargaining, anger, depression, acceptance
// joke intended! Don't give up!!!
export default {
  name: "AboutPage",
  components: {
    TeamGallery,
  },
};
</script>
<style scoped>
video {
  padding-left: 50px;
  padding-right: 50px;
}
.bg-img {
  border-radius: 0%;
  position: fixed;
  left:0;
  z-index: -1;
  object-fit: cover;
  height: 100vh;
  width:100vw;
}
</style>
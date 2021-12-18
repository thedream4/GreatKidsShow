<template>
  <div>
    <h1>This is About Page</h1>
    <video controls data-aos="fade-up" data-aos-duration="1500">
      <source src="" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <TeamGallery />
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
</style>
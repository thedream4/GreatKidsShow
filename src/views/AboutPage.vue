<template>
  <div>
    <img  src="../assets/bg-mount.jpg" alt="background image"  class="bg-img"  data-aos="fade-down"  data-aos-duration="1500" />
    
    <h2><i>☆☆☆ ABOUT US ☆☆☆</i></h2>
    <TeamGallery data-aos="fade-up" data-aos-duration="1500" />
    
    <h2><i>☆☆☆ FAQ ☆☆☆</i></h2>
    <Accordion />
  </div>
</template>

<script>
import TeamGallery from "../components/TeamGallery.vue";
import Accordion from "../components/Accordion.vue";
// five phases of software development:
// denial, bargaining, anger, depression, acceptance
// joke intended! Don't give up!!!
export default {
  name: "AboutPage",
  components: {
    TeamGallery,
    Accordion,
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
  left: 0;
  z-index: -1;
  object-fit: cover;
  height: 100vh;
  width: 100vw;
}
</style>
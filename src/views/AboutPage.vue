<template>
  <div>
    <h1>This is About Page</h1>
    <video controls data-aos="slide-left" data-aos-duration="1500">
      <source src="" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <!-- <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum obcaecati,
      possimus illum nisi ducimus incidunt quod quae aliquam illo vero fugiat
      quos nemo nobis culpa beatae molestias enim perferendis recusandae
      reiciendis officiis odit dolorem veniam assumenda. Iste tenetur rerum
      molestiae facilis blanditiis minima alias magni!
      <br>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia molestiae fugiat illum nemo quasi fuga non ad, tempore esse magni odit possimus voluptas vitae rerum optio incidunt! Debitis, rem voluptatem.
    </p> -->
    <TeamGallery />
  </div>
</template>

<script>
import TeamGallery from '../components/TeamGallery.vue'
export default {
  name: "AboutPage",
  components:{
    TeamGallery,
  }
};
</script>

<style scoped>
</style>
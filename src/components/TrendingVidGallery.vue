<template>
  <div>
    <h2><i>☆☆☆ TRENDING VIDEOS ☆☆☆</i></h2>
    <div class="viewport">
      <div class="container">
        <div
          data-aos="flip-left"
          data-aos-duration="1500"
          class="card-m"
          v-for="cartoon in cartoons"
          v-bind:key="cartoon._id"
        >
          <md-ripple>
            <!-- ripple effect on click -->
            <img
              src="../assets/default.jpg"
              alt="food"
              style="width: 100%; height: auto"
            />
            <div>
              <h3>☆ {{ cartoon.title }} ☆</h3>
              {{ cartoon.description }}
            </div>
          </md-ripple>
        </div>
        <!-- end of card-m -->
      </div>
    </div>
  </div>
</template>

<script>
import cartoonData from "../data/cartoon.json";

export default {
  name: "TrendingVideos",
  components: {},
  data() {
    return {
      cartoons: cartoonData,
    };
  },
};
</script>

<style scoped>
img {
  border-radius: 10%;
}

.card-m div {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100px;
}
h3 {
  margin: 0;
}
</style>
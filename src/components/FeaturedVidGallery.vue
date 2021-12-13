<template>
  <div>
    <h2><i>☆☆☆ FEATURED VIDEOS ☆☆☆</i></h2>
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
            <img
              :src="cover(cartoon.thumbnail)" 
              alt="food"
              style="width: 100%; height: auto"
            />
            <div>
              <h3>☆ {{ cartoon.title }} ☆</h3>
              {{ cartoon.description }}
            </div>
          </md-ripple>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartoonData from "../data/cartoon.json";

export default {
  name: "FeaturedVideos",
  components: {},
  data() {
    return {
      cartoons: cartoonData,
    };
  },
  methods: {
    // method is functions in vue
    // this function (called on line 15) checks for matching image to bind to the for-loop
    cover(url) {
      if (url !== "") {
        //url not empty
        try {
          url = require("@/assets/" + url); // match the url and use that image
        } catch (e) {
          url = require("@/assets/default.jpg"); // use a default image if error
        }
      } else url = require("@/assets/default.jpg"); // use a default image if url empty
      return url;
    },
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
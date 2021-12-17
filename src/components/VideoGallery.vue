<template>
  <div>
    <div class="viewport">
      <div class="container">
        <div
          data-aos="slide-left"
          data-aos-duration="1500"
          class="card-m"
          v-for="cartoon in cartoons"
          v-bind:key="cartoon._id"
          @click="route(cartoon.route)"
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
export default {
  name: "cartoons",
  props: {
    cartoons: {
      type: Array,
      required: true,
    },
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
    route(route) {
      this.$router.push("/" + route);
    },
  },
};
</script>

<style scoped>
</style>
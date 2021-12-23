<template>
  <div>
    <div class="viewport">
      <div class="container">
        <div v-for="cartoon in cartoons"  v-bind:key="cartoon._id"  @click="route(cartoon.route)">
          <md-ripple> <!-- need to wrap md-ripple OUTSIDE the component that you want to ripple -->
            <div class="card" style="height: 40vh"> <!-- another bootstrap card -->
              <img :src="cover(cartoon.thumbnail)" alt="food" style="width: 100%; min-height: 120px"/>
              <div class="card-body">
                <div class="card-text">
                  <h3> {{ cartoon.title }} </h3>
                  {{ cartoon.description }}
                </div>
              </div>
            </div> <!-- end of bootstrap card -->
          </md-ripple>
        </div> <!-- end of v-for loop -->
      </div> <!-- end of container -->
    </div> <!-- end of viewport -->
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
.card {
  height: 40vh;
  width: 20vw;
}
@media screen and (max-width: 1000px) {
  .card {
    height: 35vh;
    width: 45vw;
  }
}
</style>
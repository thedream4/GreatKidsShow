<template>
  <div>
    <div class="viewport">
      <div class="container">
        <div
          data-aos="flip-left"
          data-aos-duration="1500"
          v-for="member in members"
          v-bind:key="member._id"
        >
          <md-ripple>
            <div class="card" style="width: 18rem">
              <b class="card-title">{{ member.name.toUpperCase() }}</b>
              <img
                :src="cover(member.photo)"
                alt="member"
                style="height: 250px"
              />
              <div class="card-body">
                <b class="card-text">{{ member.expertise }}</b>
                <p>{{member.ID}}</p>
              </div>
              <div style="display: flex; flex-direction: row; justify-content:space-evenly;">
                <div v-for="social in member.socials" v-bind:key="social._id">
                  <a :href="social.link" target="blank">
                    <img :src="cover(social.icon)" alt="icon" id="icon" />
                  </a>
                </div>
              </div>
            </div>
          </md-ripple>
        </div>
      </div>
      <!-- end of container -->
    </div>
    <!-- end of viewport -->
    <br /><br /><br />
  </div>
  <!-- end of template -->
</template>

<script>
import teamData from "../data/team.json";

export default {
  name: "FeaturedVideos",
  components: {},
  data() {
    return {
      members: teamData,
    };
  },
  methods: {
    // method is functions in vue
    // this function (called on line 25) checks for matching image to bind to the for-loop
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
#icon {
  width: 50px;
}
</style>
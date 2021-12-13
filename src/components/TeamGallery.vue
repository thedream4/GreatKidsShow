<template>
  <div>
    <h2><i>☆☆☆ ABOUT US ☆☆☆</i></h2>
    <div class="viewport">
      <div class="container">
        <div
          data-aos="flip-left"
          data-aos-duration="1500"
          class="card-m"
          v-for="member in members"
          v-bind:key="member._id"
        >
          <md-ripple> <!-- ripple effect on click -->
            <b>☆ {{ member.name.toUpperCase() }} ☆</b>
            <img
              :src="cover(member.photo)"
              alt="member"
              style="width: 100%; height: 300px"
            />
            <b>Expertise: {{ member.expertise }}</b>
            <div style="display: flex; flex-direction: row">
              <div v-for="social in member.socials" v-bind:key="social._id">
                <md-button>
                  <a :href="social.link" target="blank">
                    <img :src="cover(social.icon)" alt="icon" width="50px" /> <!-- calls function in line 51 -->
                  </a> 
                </md-button>
              </div>
            </div>
          </md-ripple>
        </div> <!-- end of card-m -->
      </div> <!-- end of container -->
    </div> <!-- end of viewport -->
    <br /><br /><br />
  </div> <!-- end of template -->
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
  methods: { // method is functions in vue
    // this function (called on line 25) checks for matching image to bind to the for-loop
    cover(url) {
      if (url !== "") { //url not empty
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
  border-radius: 15%;
}

.card-m {
  height: 500px;
}

.card-m div {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
@media screen and (max-width: 480px) {
}
</style>
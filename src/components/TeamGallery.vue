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
          <md-ripple>
            <!-- ripple effect on click -->
            <h3>☆ {{ member.name }} ☆</h3>
            <img
              :src="cover(member.photo)"
              alt="member"
              style="width: 100%; height: 300px"
            />
            <b>Expertise: {{ member.expertise }}</b>
            <div style="display: flex; flex-direction: row">
              <div v-for="social in member.socials" v-bind:key="social._id">
                <img :src="cover(social.icon)" alt="icon" width="50px" />
              </div>
            </div>
          </md-ripple>
        </div>
        <!-- end of card-m -->
      </div>
    </div>
    <br /><br /><br />
  </div>
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
    // "methods" is another word for "functions" in vue
    cover(url) {
      if (url !== "") {
        //url not empty
        try {
          url = require("@/assets/" + url); // check for matching path url and use that image
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
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  /* border: 2px dotted red; */
}
::-webkit-scrollbar {
  display: none;
}
.viewport {
  width: 100%;
  overflow: scroll;
  padding: 5px;
  /* border: 2px solid green; */
}
.card-m {
  margin-right: 10px;
  border: 1px solid gray;
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px;
  box-shadow: 2px 2px 3px black;
  min-width: 300px;
  height: 500px;
}

img {
  border-radius: 10%;
}

.card-m div {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  /* height: 200px; */
}
h3 {
  margin: 0;
}
</style>
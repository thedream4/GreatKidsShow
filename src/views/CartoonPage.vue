<template>
  <section>
    <div class="col1">
      <p>
        Nav (pseudocode)
        <br />
        for each item in the trivia array, loop to display the nav link
        <br />
        on click of the navlink, dynamically render the content of trivia card
        <br />
        bootstrap reusable tab component? jQuery show/hide divs?
      </p>
    </div>

    <div class="col2">
      <div>
        <div v-if="validKey">
          <h1>{{ data.title.toUpperCase() }}</h1>
          <video controls>
            <source :src="thumbnail_url" :alt="data.title" />
          </video>
        </div>
        <div v-else>
          Url /{{ $route.params.key }} is not existant
          {{ validKey }}
        </div>
      </div>
      <div>
        <p>
          Trivia Card <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem
          voluptas repellat, nulla quis asperiores sapiente ab earum neque nihil
          accusantium! <br />
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit labore
          facilis deserunt ex ea. Aspernatur ex atque modi odio ipsa. <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, ad
          harum placeat hic a temporibus? Dolores veniam alias praesentium
          autem.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
//import cartoonData
import cartoonData from "../data/featuredCartoon.json";

export default {
  name: "CartoonPage",
  computed: {
    validKey: function () {
      for (let i = 0; i < cartoonData.length; i++) {
        const d = cartoonData[i];
        if (d.route === this.$route.params.key) {
          return true;
        }
      }
      return false;
    },
    data: function () {
      for (let i = 0; i < cartoonData.length; i++) {
        const d = cartoonData[i];
        if (d.route === this.$route.params.key) {
          return d;
        }
      }
      return 0;
    },
    thumbnail_url: function () {
      let url = this.data.url;
      try {
        url = require("@/assets/" + url); // match the url and use that image
      } catch (e) {
        url = require("@/assets/default.jpg"); // use a default image if error
      }
      return url;
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  height: 100vh;
}
.col1 {
  width: 20vw;
  border: 1px solid black;
  background-color: white;
}
.col2 {
  width: 80vw;
  border: 1px solid black;
}
video {
  width: 70%;
}

@media screen and (max-width: 1000px) {
  section {
    display: block;
  }
  .col1 {
    width: 100vw;
    position: fixed;
    bottom: 0;
  }
  .col2 {
    width: 100vw;
    padding-bottom: 50vh;
  }
  video {
    width: 100%;
  }
}
</style>

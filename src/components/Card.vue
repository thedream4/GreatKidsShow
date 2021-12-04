<template>
  <div>
    <md-card class="md-with-hover">
      <md-ripple>
        <md-card-media-cover md-text-scrim>
          <md-card-media md-ratio="16:9">
            <img src="../../public/assets/logo.png" alt="Skyscraper" />
          </md-card-media>

          <md-card-area>
            <md-card-header>
              <span class="md-title">Some Title Here</span>
              <span class="md-subhead">Some descriptions here</span>
            </md-card-header>

            <md-card-actions>
              <md-button>Click</md-button>
              <md-button>Click</md-button>
            </md-card-actions>
          </md-card-area>
        </md-card-media-cover>
      </md-ripple>
    </md-card>
    <div>
      <md-button class="md-raised">Button</md-button>
      <md-button class="md-raised">Button</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

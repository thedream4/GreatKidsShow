<template>
  <div>
    <md-card class="md-with-hover">
      <md-ripple>
        <md-card-media-cover md-text-scrim>
          <md-card-media md-ratio="16:9">
            <img
              src="../assets/MusicRushThumbnail.jpg"
              alt="Music Rush Thumbnail"
            />
          </md-card-media>

          <md-card-area>
            <md-card-header>
              <span class="md-title">Music Rush</span>
              <span class="md-subhead">Some descriptions here</span>
            </md-card-header>

            <md-card-actions>
              <md-button>PLAY</md-button>
            </md-card-actions>
          </md-card-area>
        </md-card-media-cover>
      </md-ripple>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "MusicRushCard",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: 100%;
  width: 100%;
}
</style>

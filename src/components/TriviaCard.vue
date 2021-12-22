<template>
  <div>
    <b-card no-body class="overflow-hidden card" style="">
      <b-row no-gutters>
        <b-col md="6">
          <md-ripple>
            <b-card-img
              src="https://picsum.photos/400/400/?image=20"
              alt="Image"
            ></b-card-img>
          </md-ripple>
        </b-col>
        <b-col md="6">
          <md-ripple>
            <b-card-body title="Trivia">
              <b-card-text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae cumque modi officiis quidem neque, quas eius molestiae ut corrupti expedita.
              </b-card-text>
            </b-card-body>
          </md-ripple>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'TriviaCard',
  props: {
    name
  },
};
</script>

<style scoped>
.card {
  max-width: 540px;
}
</style>
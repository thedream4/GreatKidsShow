<template>
  <div>
    <b-card no-body class="overflow-hidden card" style="">
      <b-row no-gutters>
        <b-col md="6">
          <md-ripple>
            <b-card-img
              :src="cover(trivia.icon)"
              :alt="trivia.title"
            ></b-card-img>
          </md-ripple>
        </b-col>
        <b-col md="6">
          <md-ripple>
            <b-card-body :title="trivia.title">
              <b-card-text>
                {{trivia.trivia}}
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
    trivia:{
      type:Object,
      validator:function(e){
        return e.title!==undefined&&e.icon!==undefined&&e.trivia!==undefined;
      },
      default:function(){
        return {
          title:"None",
          icon:"",
          trivia:"None"
        }
      }
    }
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
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 540px;
}
</style>

<template>
  <div v-if="validKey">
    <h1>This is {{data.title}} Page</h1>
    <p>
      {{data.description}}
    </p>
    <img :src="thumbnail_url" :alt="data.title"/>
  </div>
  <div v-else>
    Url /{{$route.params.key}} is not existant
    {{validKey}}
  </div>
</template>

<script>
//import cartoonData
import cartoonData from "../data/featuredCartoon.json";

export default {
  name: "CartoonPage",
  computed:{
    validKey:function(){
    for(let i=0;i<cartoonData.length;i++){
        const d=cartoonData[i];
        if(d.route===this.$route.params.key){
          return true;
        }
      }
      return false;
    },
    data:function(){
      for(let i=0;i<cartoonData.length;i++){
        const d=cartoonData[i];
        if(d.route===this.$route.params.key){
          return d;
        }
      }
      return 0;
    },
    thumbnail_url:function(){
      let url=this.data.thumbnail;
      try {
        url = require("@/assets/" + url); // match the url and use that image
      } catch (e) {
        url = require("@/assets/default.jpg"); // use a default image if error
      }
      return url;
    }
  }
};
</script>

<style scoped>
img{
  width:auto;
  height:400px;
}
</style>

<template>
  <div v-if="shown" v-on:click="shown=false">
    <span><img :src="gif_url"/></span>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data: function () {
    return {
      shown: false,
    };
  },
  computed: {
    gif_url: function() {
        if(!this.shown){
          return "";
        }
        else{
          try{
            // use random number generator to determine which gif gets shown in line 3
            // ../assets/giphy(n).gif   where (n) is random number from 1 to 10
            // ../assets/giphy1.gif     ../assets/giphy2.gif    ../assets/giphy3.gif
            return require(`../assets/giphy${Math.floor(Math.random() * 10 + 1)}.gif`);
          }
          catch(e){
            return "";
          }
        }
    },
  },
};
</script>

<style scoped>
div {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  z-index: 600;
}
</style>

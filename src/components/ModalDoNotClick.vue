<template>
  <div v-if="shown" v-on:click="shown = false">
    <span>
      <h1>I TOLD YOU NOT TO CLICK</h1>
      <img v-if="gif == 1" src="" />
      <img v-else-if="gif == 2" src="../assets/icon-onion.png" />
      <img v-else-if="gif == 3" src="../assets/icon-orange.png" />
      <img v-else-if="gif == 4" src="../assets/icon-pear.png" />
      <img v-else-if="gif == 5" src="../assets/icon-potato.png" />
      <img v-else-if="gif == 6" src="../assets/icon-sashimi.png" />
      <img v-else-if="gif == 8" src="../assets/icon-stag.png" />
      <img v-else-if="gif == 9" src="../assets/icon-sweet-potato.png" />
      <img v-else src="../assets/icon-temaki.png" />
    </span>
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
    gif: function() { 
      return Math.floor(Math.random() * 10 + 1);
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

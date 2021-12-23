<template>
  <div v-if="shown" v-on:click="shown = false">
    <span>
      <h1>I TOLD YOU NOT TO CLICK</h1>
      <h3 v-if="gif == 1">*Gif1*</h3>
      <h3 v-else-if="gif == 2">*Gif2*</h3>
      <h3 v-else-if="gif == 3">*Gif3*</h3>
      <h3 v-else-if="gif == 4">*Gif4*</h3>
      <h3 v-else-if="gif == 5">*Gif5*</h3>
      <h3 v-else-if="gif == 6">*Gif6*</h3>
      <h3 v-else-if="gif == 8">*Gif8*</h3>
      <h3 v-else-if="gif == 9">*Gif9*</h3>
      <h3 v-else>*Gif10*</h3>
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

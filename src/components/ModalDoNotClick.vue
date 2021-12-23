<template>
  <div>
    <span>
      <h1>I TOLD YOU NOT TO CLICK</h1>
      <h3>*insert some funny gif here*</h3>
    </span>
  </div>
</template>

<script>
export default {
  name: "Modal",
  //   on app mount, emit click event to trigger modal popup
};
</script>

<style scoped>
div {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color:white;
  z-index:600;
}
</style>
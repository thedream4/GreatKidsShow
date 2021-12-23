<template>
  <div>
    <b-button v-b-modal.modal-multi-1 ref="myBtn" style="visibility: hidden"></b-button>

    <b-modal  id="modal-multi-1"  size="lg" title="WELCOME"  ok-only no-stacking >
      <h1 class="my-2">Welcome to the Great Kids Show!</h1>
      <b-button v-b-modal.modal-multi-2>What is the Great Kids Show?</b-button>
    </b-modal>

    <b-modal id="modal-multi-2" title="THE GREAT KIDS SHOW" ok-only>
      <p class="my-2">The Great Kids Show is all about breeding entertainment with education. Here, we break complex information into bite-sized chunks that is convenient for everyday access. Our website is intended to look like an iPad game and mimic Fisher Price toys, because our goal is not to create something for kids to use, rather, to create something that kids are already using, and use that to provide value</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Modal",
//   on app mount, emit click event to trigger modal popup
  mounted() {
    const elem = this.$refs.myBtn;
    elem.click();
  },
};
</script>

<style>
</style>
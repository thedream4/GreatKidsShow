<template>
  <div>
    <b-button v-b-modal.modal-multi-1 ref="myBtn" style="visibility: hidden"></b-button>

    <b-modal  id="modal-multi-1"  size="lg" title="WELCOME"  ok-only no-stacking >
      <p class="my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt magnam vel ratione omnis modi? Sed exercitationem quos dicta nam sit?</p>
      <b-button v-b-modal.modal-multi-2>Next</b-button>
    </b-modal>

    <b-modal id="modal-multi-2" title="WELCOME" ok-only>
      <p class="my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nihil quis exercitationem, dicta vitae nobis blanditiis error accusamus similique officiis.</p>
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
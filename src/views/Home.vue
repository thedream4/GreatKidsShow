<template>
  <div>
    <h1>This is Home.vue</h1>
    <Card />
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'

export default {
  name: 'Home',
  components: {
    Card
  }
}
</script>

<template>
  <div class="container">
    <div>
      <h1 class="title">
        portfolio
      </h1>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Index',
  computed: mapState(['setIndex']),
  watch: {
    setIndex (newValue, oldValue) {
      if (typeof newValue === 'function') {
        this.$store.state.setIndex()
      }
    }
  }
}
</script>

<style lang="stylus">
  .container
    margin: 0 auto
    min-height: 100vh
    display: flex
    justify-content: center
    align-items: center
    text-align: center
</style>

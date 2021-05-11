<template>
  <canvas id="_canvas" />
</template>

<script>
import App from '~/assets/js/App.js'

export default {
  name: 'Three',
  mounted () {
    const app = new App()
    this.$store.commit('setIndexSetter', app.world.setIndex)
  }
}
</script>

<style lang="stylus">
    canvas
        position: absolute
        top: 0
        left: 0
        z-index: -10
</style>

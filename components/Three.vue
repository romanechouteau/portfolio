<template>
  <canvas id="_canvas" />
</template>

<script>
import App from '~/assets/js/App.js'

export default {
  name: 'Three',
  async mounted () {
    const app = new App()
    await app.init()
    this.$emit('loaded')
    this.$store.commit('setWorldSetters', {
      setHome: app.world.setIndex,
      setIndexProject: app.world.setIndexProject,
      hideIndex: app.world.hideIndex,
      setProject: app.world.setProject,
      hideProject: app.world.hideProject,
      setAbout: app.world.setAbout,
      hideAbout: app.world.hideAbout
    })
  }
}
</script>

<style lang="stylus">
  canvas
      position: fixed
      top: 0
      left: 0
      z-index: -10
</style>

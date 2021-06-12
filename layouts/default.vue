<template>
  <div class="layout">
    <Nuxt v-if="$store.state.ready" />
    <Three @loaded="onLoaded" />
    <Contact v-if="$store.state.ready" />
    <Nav v-if="$store.state.ready" />
    <CustomCursor v-if="$store.state.ready" />
    <Loader v-if="!loaded" />
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    onLoaded () {
      this.loaded = true
    }
  }
}
</script>

<style lang="stylus">
  .layout
    min-height: 100vh
    width: 100%
    display: flex
    justify-content: flex-start
    align-items: center

</style>

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
import Nav from '../components/Nav.vue'

export default {
  name: 'Layout',
  components: {
    Nav
  },
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
  html, body, #__nuxt, #__layout
    width: 100%
    height: 100%

  .layout
    height: 100%
    width: 100%
    display: flex
    justify-content: flex-start
    align-items: center

</style>

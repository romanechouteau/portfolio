<template>
  <div class="container">
    About
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isFunction, get } from 'lodash'

export default {
  name: 'About',
  computed: mapState(['worldSetters']),
  watch: {
    worldSetters (newValue) {
      this.setAbout(newValue.setAbout)
    }
  },
  mounted () {
    this.setAbout(get(this.$store.state, 'worldSetters.setAbout'))
  },
  beforeDestroy () {
    if (isFunction(get(this.$store.state, 'worldSetters.hideAbout'))) {
      this.$store.state.worldSetters.hideAbout()
    }
  },
  methods: {
    setAbout (setAbout) {
      if (isFunction(setAbout)) {
        setAbout()
      }
    }
  }
}
</script>

<style lang="stylus">
  body
    height: 100vh
    overflow: hidden

  .container
    min-height: 100vh
    text-align: center
    margin: 0 auto
    padding: 48px
    display: flex
    justify-content: center
    align-items: flex-end

    .subtitle
      font-weight: bold
      color: carbon
      font-size: 1.5rem
      transition: all 0.7s ease

      &.hidden
        transform: translateY(calc(48px + 5vh))

</style>

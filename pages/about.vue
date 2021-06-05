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

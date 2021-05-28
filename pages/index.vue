<template>
  <div class="container">
    <h2 :class="[$store.state.indexPage === 0 ? '' : 'hidden','subtitle']">
      creative developer
    </h2>
    <HomePagesButtons :pages="pages" />
    <HomeProjectsInfo :pages="pages.slice(1)" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { get, isFunction, isEqual } from 'lodash'

export default {
  name: 'Index',
  async asyncData ({ $content }) {
    const projects = await $content('projects').fetch()
    return {
      pages: [
        { name: 'index' },
        ...projects
      ]
    }
  },
  computed: mapState(['worldSetters', 'indexPage']),
  watch: {
    worldSetters (newValue) {
      this.setIndex(newValue.setHome)
    },
    indexPage (newValue) {
      if (!isEqual(newValue, 0)) {
        return this.setProject(this.$store.state.worldSetters.setIndexProject, newValue)
      }
      return this.setIndex(this.$store.state.worldSetters.setHome)
    }
  },
  mounted () {
    this.$store.commit('setIndexPage', 0)
    this.setIndex(get(this.$store.state, 'worldSetters.setHome'))
  },
  beforeDestroy () {
    if (isFunction(get(this.$store.state, 'worldSetters.hideIndex'))) {
      this.$store.state.worldSetters.hideIndex()
    }
  },
  methods: {
    setIndex (setHome) {
      if (isFunction(setHome)) {
        setHome()
      }
    },
    setProject (setIndexProject, key) {
      if (isFunction(setIndexProject)) {
        setIndexProject(key)
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

<template>
  <div class="container">
    <h2 :class="[$store.state.indexPage === 0 ? '' : 'hidden','subtitle']">
      creative developer
    </h2>
    <PagesButtons :pages="pages" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { get, isFunction, isEqual } from 'lodash'

export default {
  name: 'Index',
  async asyncData ({ $content }) {
    const projects = await $content('data').only(['projects']).fetch()
    return {
      pages: [
        { name: 'index' },
        ...get(projects, 'projects', [])
      ]
    }
  },
  computed: mapState(['indexSetters', 'indexPage']),
  watch: {
    indexSetters (newValue) {
      if (isFunction(newValue.setHome)) {
        newValue.setHome()
      }
    },
    indexPage (newValue) {
      if (!isEqual(newValue, 0) && isFunction(get(this.$store.state, 'indexSetters.setProject'))) {
        return this.$store.state.indexSetters.setProject(newValue)
      }
      if (isEqual(newValue, 0) && isFunction(get(this.$store.state, 'indexSetters.setHome'))) {
        return this.$store.state.indexSetters.setHome()
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

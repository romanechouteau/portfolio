<template>
  <div class="container">
    {{ project.name }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isFunction, nth, get } from 'lodash'

export default {
  name: 'Project',
  async asyncData ({ params, $content }) {
    const projects = await $content('projects').where({ slug: params.slug }).fetch()

    return {
      project: nth(projects, 0)
    }
  },
  computed: mapState(['worldSetters']),
  watch: {
    worldSetters (newValue) {
      this.setProject(newValue.setProject)
    }
  },
  mounted () {
    this.setProject(get(this.$store.state, 'worldSetters.setProject'))
  },
  beforeDestroy () {
    if (isFunction(get(this.$store.state, 'worldSetters.hideProject'))) {
      this.$store.state.worldSetters.hideProject()
    }
  },
  methods: {
    setProject (setProject) {
      if (isFunction(setProject)) {
        setProject(this.project.id)
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

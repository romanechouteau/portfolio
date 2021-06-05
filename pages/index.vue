<template>
  <div class="container">
    <HomeSubtitle />
    <HomePagesButtons :pages="pages" />
    <HomeProjectsInfo :pages="pages.slice(1)" />
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { mapState } from 'vuex'
import { get, isFunction, isEqual } from 'lodash'

export default {
  name: 'Index',
  transition: {
    mode: '',
    css: false,
    enter (el, done) {
      done()
    },
    leave (el, done) {
      gsap.timeline({ onComplete: done })
        .add('start')
        .to(el.querySelectorAll('.staggerHideLeft'), {
          duration: 0.2,
          left: `-${window.getComputedStyle(el.querySelector('.pages'), null).getPropertyValue('padding-left')}`,
          translateX: '-200%',
          stagger: 0.05
        }, 'start')
        .to(el.querySelectorAll('.hideRight'), {
          duration: 0.2,
          left: '100vw',
          right: 'auto'
        }, 'start')
        .to(el.querySelectorAll('.subtitle'), {
          duration: 0.2,
          bottom: '-96px'
        }, 'start')
      if (isFunction(get(this.$store.state, 'worldSetters.hideIndex'))) {
        this.$store.state.worldSetters.hideIndex()
      }
    }
  },
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

<style lang="stylus" scoped>
  .container
    position: relative
    height: 100vh
    width: 100vw
    overflow: hidden
</style>

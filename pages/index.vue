<template>
  <div class="container">
    <Subtitle />
    <PagesButtons :pages="pages" />
    <ProjectsInfo :pages="pages.slice(1)" />
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { mapState } from 'vuex'
import { get, isFunction, isEqual } from 'lodash'

import Subtitle from '../components/Text/BottomSubtitle'
import PagesButtons from '../components/Buttons/Pages'
import ProjectsInfo from '../components/Text/ProjectsInfo'

export default {
  name: 'Index',
  components: {
    Subtitle,
    PagesButtons,
    ProjectsInfo
  },
  transition: {
    mode: '',
    css: false,
    appear: true,
    enter (el, done) {
      const left = el.querySelector('.pages') ? window.getComputedStyle(el.querySelector('.pages'), null).getPropertyValue('padding-left') : '0px'
      gsap.fromTo(el.querySelectorAll('.staggerHideLeft'),
        {
          left: `-${left}`,
          translateX: '-200%',
          opacity: 0
        },
        {
          delay: 0.7,
          duration: 0.6,
          left: 0,
          translateX: 0,
          opacity: 1,
          stagger: 0.05,
          onComplete: done
        })
    },
    leave (el, done) {
      const left = el.querySelector('.pages') ? window.getComputedStyle(el.querySelector('.pages'), null).getPropertyValue('padding-left') : '0px'
      gsap.timeline({
        onComplete: () => {
          done()
          this.$store.commit('setIndexPage', 0)
        }
      })
        .add('start')
        .to(el.querySelectorAll('.staggerHideLeft'), {
          duration: 0.2,
          left: `-${left}`,
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
      this.setIndex(newValue.setHome, true)
    },
    indexPage (newValue) {
      if (!isEqual(newValue, 0)) {
        return this.setProject(this.$store.state.worldSetters.setIndexProject, newValue)
      }
      return this.setIndex(this.$store.state.worldSetters.setHome, false)
    }
  },
  mounted () {
    this.$store.commit('setIndexPage', 0)
    this.setIndex(get(this.$store.state, 'worldSetters.setHome'), true)
  },
  methods: {
    setIndex (setHome, hasDelay) {
      if (isFunction(setHome)) {
        setHome(hasDelay)
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

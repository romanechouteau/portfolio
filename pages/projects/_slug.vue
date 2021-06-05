<template>
  <div class="container project">
    <Back custom-class="project" />
    <Title :name="project.name" custom-class="project" />
    <Description :text="project.description" custom-class="project" />
    <CTA type="project" custom-class="project" />
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { mapState } from 'vuex'
import { isFunction, nth, get, isEqual } from 'lodash'

import CTA from '../../components/Project/CTA'
import Back from '../../components/Project/Back'
import Title from '../../components/Project/Title'
import Description from '../../components/Project/Description'

export default {
  name: 'Project',
  components: {
    CTA,
    Back,
    Title,
    Description
  },
  transition: {
    mode: '',
    appear: true,
    css: false,
    enter (el, done) {
      gsap.fromTo(el.children,
        {
          translateY: '48px',
          opacity: 0
        },
        {
          delay: 0.3,
          duration: 0.6,
          translateY: '0',
          opacity: 1,
          stagger: 0.2,
          onComplete: done
        })
    },
    leave (el, done) {
      gsap.to(el.children, {
        duration: 0.3,
        translateY: '48px',
        opacity: 0,
        stagger: 0.1,
        onComplete: done
      })
    }
  },
  async asyncData ({ params, $content }) {
    const projects = await $content('projects').where({ slug: params.slug }).fetch()

    return {
      project: nth(projects, 0)
    }
  },
  data () {
    return {
      is3DSet: false
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
      if (isFunction(setProject) && isEqual(this.is3DSet, false)) {
        setProject(this.project.id)
        this.is3DSet = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    height: 80%
    position: absolute
    left: calc(5vw + 57vh)
    text-align: left
    display: flex
    flex-direction: column
    justify-content: center
    padding: 0 5vw
    max-width: 1000px
    color: carbon
</style>

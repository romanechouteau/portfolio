<template>
  <Right custom-class="project">
    <Link
      url="/"
      text="back"
      type="nuxt"
      decoration="arrowBack"
      custom-class="project back"
    />
    <Title
      :text="project.name"
      custom-class="project"
    />
    <PlaceholdersImagePlaceholder />
    <Description
      :text="project.description"
      custom-class="project"
    />
    <Link
      :url="project.link"
      text="see project"
      decoration="arrowCurly"
      custom-class="project"
    />
  </Right>
</template>

<script>
import { mapState } from 'vuex'
import { isFunction, nth, get, isEqual } from 'lodash'

import Link from '../../components/Buttons/Link'
import Title from '../../components/Text/Title'
import Right from '../../components/Containers/Right'
import Description from '../../components/Text/Description'
import { APPEAR_FROM_BOTTOM_TRANSITION } from '~/assets/js/config'

export default {
  name: 'Project',
  components: {
    Link,
    Title,
    Right,
    Description
  },
  transition: APPEAR_FROM_BOTTOM_TRANSITION,
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

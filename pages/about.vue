<template>
  <Right custom-class="about">
    <Title :text="title" :has-subtitle="true" />
    <Subtitle :text="subtitle" />
    <Description :text="description" />
    <div class="links">
      <Link
        v-for="link, key in links"
        :key="key"
        :url="link.url"
        :text="link.text"
        custom-class="about"
      />
    </div>
  </Right>
</template>

<script>
import { mapState } from 'vuex'
import { isFunction, get } from 'lodash'

import Title from '../components/Text/Title'
import Link from '../components/Buttons/Link'
import Right from '../components/Containers/Right'
import Subtitle from '../components/Text/Subtitle'
import Description from '../components/Text/Description'
import { APPEAR_FROM_BOTTOM_TRANSITION } from '~/assets/js/config'

export default {
  name: 'About',
  components: {
    Title,
    Right,
    Link,
    Subtitle,
    Description
  },
  transition: APPEAR_FROM_BOTTOM_TRANSITION,
  async asyncData ({ $content }) {
    const data = await $content('about').fetch()
    return {
      title: get(data, 'title', ''),
      links: get(data, 'links', []),
      subtitle: get(data, 'subtitle', ''),
      description: get(data, 'description', '')
    }
  },
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

<style lang="stylus" scoped>
  .links
    display: flex
    flex-direction: row
    justify-content: flex-start
    align-items: center
</style>

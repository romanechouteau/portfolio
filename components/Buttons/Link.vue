<template>
  <div ref="link" :class="['link', customClass]">
    <NuxtLink
      v-if="type === 'nuxt'"
      :to="url"
      @click.native="onClick"
    >
      {{ text }}
    </NuxtLink>
    <a
      v-else
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      @click="onClick"
    >
      {{ text }}
    </a>
    <Waves v-if="decoration === 'waves'" class="decoration" />
    <Underline v-else-if="decoration === 'underline'" class="decoration" />
    <Arrow v-else-if="decoration === 'arrow'" class="decoration" />
    <ArrowCurly v-else-if="decoration === 'arrowCurly'" class="decoration" />
    <ArrowBack v-else-if="decoration === 'arrowBack'" class="decoration" />
    <CircleOutline v-else-if="decoration === 'circle'" class="decoration circle" />
    <Cloud v-else-if="decoration === 'cloud'" class="decoration circle" />
    <DoubleUnderline v-else-if="decoration === 'doubleUnderline'" class="decoration" />
  </div>
</template>

<script>
import { gsap } from 'gsap'

import Waves from '~/assets/svgs/waves.inline.svg'
import Arrow from '~/assets/svgs/arrow.inline.svg'
import Cloud from '~/assets/svgs/cloud.inline.svg'
import Underline from '~/assets/svgs/underline.inline.svg'
import ArrowBack from '~/assets/svgs/arrow_back.inline.svg'
import ArrowCurly from '~/assets/svgs/arrow_curly.inline.svg'
import CircleOutline from '~/assets/svgs/circle.inline.svg'
import DoubleUnderline from '~/assets/svgs/double_underline.inline.svg'

export default {
  name: 'Link',
  components: {
    Waves,
    Arrow,
    Cloud,
    Underline,
    ArrowBack,
    ArrowCurly,
    CircleOutline,
    DoubleUnderline
  },
  props: {
    url: { type: String, default: '' },
    type: { type: String, default: '' },
    text: { type: String, default: '' },
    decoration: { type: String, default: 'waves' },
    customClass: { type: String, default: '' }
  },
  mounted () {
    this.$refs.link.querySelectorAll('path').forEach((elem) => {
      elem.style.strokeDashoffset = elem.getTotalLength()
      elem.style.strokeDasharray = elem.getTotalLength()
    })

    this.$refs.link.addEventListener('mouseenter', () => {
      gsap.to('.cursor', {
        duration: 0.5,
        opacity: 0
      })
    })
    this.$refs.link.addEventListener('mouseleave', () => {
      gsap.to('.cursor', {
        duration: 0.5,
        opacity: 1
      })
    })
  },
  methods: {
    onClick () {
      this.$store.commit('toggleBurger', false)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .link
      position: relative
      display: inline-block
      width: fit-content
      font-family: 'Gloria Hallelujah', cursive

      & a
          color: carbon
          text-decoration: none
          padding: 0.5rem

      .decoration
          opacity: 1
          position: absolute
          width: 80%
          top: calc(100% - 0.25rem)
          left: 50%
          transform: translateX(-50%)
          z-index: -1

          & path
              transition: stroke-dashoffset 0.5s ease

          &.circle
              width: 100%
              top: 50%
              transform: translate(-50%, -50%)

      &:hover
          .decoration path
              stroke-dashoffset: 0!important

      &.about
          margin-right: 3rem

      &.back
          margin-bottom: 1.5rem

      &.nav
          margin-left: 3rem

      &.absolute
          position: absolute
          bottom: 25%
          left: 55%
          transform: translateX(calc(50vw + 100%))
          transition: transform 0.7s ease

      .show &
          transform: none

  @media (max-aspect-ratio: 13/10) {
    .link.back {
      position: relative
      left: -0.5rem
      margin-bottom: 6rem
    }

    .link.nav {
      margin: 1.5rem 0
      font-size: 1.2rem
    }
  }
</style>

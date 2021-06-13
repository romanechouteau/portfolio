<template>
  <div ref="link" class="pages">
    <button
      v-for="(page, key) in pages"
      :key="key"
      :class="[isSelected(key) ? 'selected' : '', 'button', 'staggerHideLeft']"
      @click="handleClick(key)"
    >
      <PageBlob />
    </button>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { isEqual, debounce, get } from 'lodash'

import PageBlob from '~/assets/svgs/page_blob.inline.svg'

export default {
  name: 'Pages',
  components: {
    PageBlob
  },
  props: {
    pages: { type: Array, default: () => [] }
  },
  data () {
    return {
      touchY: 0
    }
  },
  beforeMount () {
    this.scrollHandler = debounce(this.handleScroll, 300, { leading: true, trailing: false, maxWait: 1500 })
    window.addEventListener('wheel', this.scrollHandler)
    window.addEventListener('touchstart', this.touchStart)
    window.addEventListener('touchmove', this.scrollHandler)
    window.addEventListener('touchend', this.touchEnd)
  },
  beforeDestroy () {
    window.removeEventListener('wheel', this.scrollHandler)
    window.removeEventListener('touchstart', this.touchStart)
    window.removeEventListener('touchmove', this.scrollHandler)
    window.removeEventListener('touchend', this.touchEnd)
  },
  mounted () {
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
    handleClick (key) {
      this.$store.commit('setIndexPage', key)
    },
    isSelected (key) {
      return isEqual(this.$store.state.indexPage, key)
    },
    handleScroll (event) {
      if (event.deltaY >= 0 || get(event, 'touches[0].clientY', this.touchY + 1) <= this.touchY) {
        this.touchY = get(event, 'touches[0].clientY', 0)
        return this.$store.commit('setIndexPage', (this.$store.state.indexPage + 1) % (this.pages.length))
      }

      const prevPage = this.$store.state.indexPage - 1
      this.$store.commit('setIndexPage', prevPage >= 0 ? prevPage : this.pages.length - 1)
    },
    touchStart (event) {
      this.touchY = get(event, 'touches[0].clientY', 0)
    },
    touchEnd () {
      this.touchY = 0
    }
  }
}
</script>

<style lang="stylus">
  .pages
    position: absolute
    bottom: 0
    left: 0
    padding: 3rem
    display: flex
    flex-direction: column

    .button
      position: relative
      display: block
      width: 1rem
      height: 1rem
      margin-top: 1rem
      border: none
      background-color: transparent
      outline: none
      cursor: pointer
      background-size: contain
      background-repeat: no-repeat
      background-position: center

      svg
        position: absolute
        width: 100%
        height: 100%

        .stroke
          fill: carbon

        .fill
          fill: transparent
          transition: fill 0.1s ease

      &.selected, &:hover
        svg
          .fill
              fill: carbon

  @media (max-aspect-ratio: 13/10) {
    .pages {
      display: none
    }
  }
</style>

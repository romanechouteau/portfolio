<template>
  <div class="pages">
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
import { isEqual, debounce } from 'lodash'

import PageBlob from '~/assets/svgs/page_blob.inline.svg'

export default {
  name: 'PageButtons',
  components: {
    PageBlob
  },
  props: {
    pages: { type: Array, default: () => [] }
  },
  beforeMount () {
    this.scrollHandler = debounce(this.handleScroll, 300, { leading: true, trailing: false, maxWait: 1500 })
    window.addEventListener('wheel', this.scrollHandler)
  },
  beforeDestroy () {
    window.removeEventListener('wheel', this.scrollHandler)
  },
  methods: {
    handleClick (key) {
      this.$store.commit('setIndexPage', key)
    },
    isSelected (key) {
      return isEqual(this.$store.state.indexPage, key)
    },
    handleScroll (event) {
      if (event.deltaY >= 0) {
        return this.$store.commit('setIndexPage', (this.$store.state.indexPage + 1) % (this.pages.length))
      }

      const prevPage = this.$store.state.indexPage - 1
      this.$store.commit('setIndexPage', prevPage >= 0 ? prevPage : this.pages.length - 1)
    }
  }
}
</script>

<style lang="stylus">
  .pages
    position: absolute
    bottom: 0
    left: 0
    padding: 48px
    display: flex
    flex-direction: column

    .button
        position: relative
        display: block
        width: 16px
        height: 16px
        margin-top: 16px
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
</style>

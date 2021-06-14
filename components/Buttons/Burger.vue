<template>
  <div :class="['burgerIcon', $store.state.burgerShow ? 'close' : '']" @click="toggleBurger">
    <Icon />
  </div>
</template>

<script>
import Icon from '~/assets/svgs/burger.inline.svg'

export default {
  name: 'Nav',
  components: {
    Icon
  },
  methods: {
    toggleBurger () {
      this.$store.commit('toggleBurger', !this.$store.state.burgerShow)
    }
  }
}
</script>

<style lang="stylus" scoped>
    .burgerIcon
        display: none
        width: 2.5rem
        height: 2.5rem
        z-index: 2

        svg
            position: relative
            width: 100%
            height: 100%

            path
                transition: transform 0.5s ease

            #line-1, #line-3
                transform-origin: top left

            #line-2
                transform-origin: center

    &.close
        #line-1
            transform: rotate(45deg) translate(25%, -25%)

        #line-2
            transform: scaleX(0)

        #line-3
            transform: rotate(-45deg) translate(-40%, -0%)

    @media (max-aspect-ratio: 13/10) {
        nav .burgerIcon {
            display: block
        }
    }
</style>

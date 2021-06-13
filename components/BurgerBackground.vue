<template>
  <div class="background">
    <div class="divider">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill" />
      </svg>
      <div class="fill-divider" />
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { mapState } from 'vuex'

const dividerHeight = 100

export default {
  name: 'BurgerBackground',
  computed: mapState(['burgerShow']),
  watch: {
    burgerShow (newValue) {
      this.toggleShow(newValue)
    }
  },
  methods: {
    toggleShow (newValue) {
      const longDuration = 1.5
      const shortDuration = 0.7

      document.querySelector('.background').style.display = 'flex'

      gsap.to('.divider svg', {
        keyframes: [
          { height: `${dividerHeight}px`, duration: shortDuration },
          { height: 0, duration: longDuration }
        ],
        delay: newValue ? 0 : 0.3,
        ease: 'power3.inOut'
      })
      gsap.to('.divider', {
        keyframes: [
          { height: newValue ? '30%' : '70%', duration: shortDuration },
          { height: newValue ? '100%' : '0%', duration: longDuration }
        ],
        delay: newValue ? 0 : 0.3,
        ease: 'power3.inOut',
        onComplete (show) {
          if (!show) {
            document.querySelector('nav .links').style.display = 'none'
            document.querySelector('.background').style.display = 'none'
          }
        },
        onCompleteParams: [newValue]
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .background
    position: absolute
    left: 0
    top: 100vh
    width: 100vh
    height: 100vw
    display: none
    align-items: flex-end
    transform: rotate(-90deg)
    transform-origin: top left

    .divider
        display: flex
        width: 100%
        height: 0
        flex-direction: column
        justify-content: flex-end
        transform-origin: bottom center

        svg
            position: relative
            display: block
            width: calc(195% + 1.3px)
            height: 0

        .fill-divider
            flex-grow: 1
            background-color: light-blue

        .shape-fill
            fill: light-blue
</style>

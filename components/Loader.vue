<template>
  <transition
    @leave="onLeave"
    @after-leave="onReady"
  >
    <div class="loader">
      <div class="divider top">
        <div class="fill-divider" />
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill" />
        </svg>
      </div>
      <div class="divider bottom">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill" />
        </svg>
        <div class="fill-divider" />
      </div>
      <img src="~/assets/images/smiley_contact.svg" class="smiley" alt="Smiley face">
    </div>
  </transition>
</template>

<script>
import { gsap } from 'gsap'

const dividerHeight = 245

export default {
  name: 'Loader',
  data () {
    return {
      time: new Date()
    }
  },
  mounted () {
    this.time = new Date()
    gsap.to('.smiley', {
      duration: 1,
      opacity: 1
    })
    gsap.to('.smiley', {
      duration: 1.8,
      rotate: 360,
      repeat: -1,
      ease: 'elastic.inOut(1, 0.5)'
    })
  },
  methods: {
    onLeave (el, done) {
      const delay = new Date().getTime() - this.time.getTime() < 1000 ? 1 : 0
      gsap.to('.divider svg', {
        keyframes: [
          { height: `${dividerHeight}px`, duration: 1.5 },
          { height: 0, duration: 0.7 }
        ],
        ease: 'power3.inOut',
        delay: delay + 0.4
      })
      gsap.to('.divider', {
        keyframes: [
          { height: '30%', duration: 1.5 },
          { height: 0, duration: 0.7 }
        ],
        ease: 'power3.inOut',
        onComplete: done,
        delay: delay + 0.4
      })
      gsap.to('.smiley', {
        duration: 1,
        translateY: '60vh',
        ease: 'back.in(1.7)',
        delay
      })
    },
    onReady () {
      this.$store.commit('isReady')
    }
  }
}
</script>

<style lang="stylus" scoped>
    .loader
        width: 100%
        height: 100%

        .smiley
            position: absolute
            top: 50%
            left: 50%
            width: 8rem
            height: 8rem
            opacity: 0
            transform: translate(-50%, -50%)

        .divider
            position: absolute
            left: 0
            height: 50%
            width: 100%
            display: flex
            flex-direction: column

            &.top
                top: 0

            &.bottom
                bottom: 0

            svg
                position: relative
                display: block
                width: calc(195% + 1.3px)
                height: 0

            .fill-divider
                flex-grow: 1
                background-color: white

            .shape-fill
                fill: white
</style>

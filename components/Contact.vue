<template>
  <a ref="link" href="mailto:romane.chouteau@gmail.com" class="contact" aria-label="Get in touch with me via email">
    <img src="~/assets/images/smiley_contact.svg" class="smiley" alt="Smiley face">
    <img src="~/assets/images/text_contact.svg" class="text" alt="Get in touch">
  </a>
</template>

<script>
import { gsap } from 'gsap'
import { mapState } from 'vuex'

export default {
  name: 'Contact',
  computed: mapState(['burgerShow']),
  watch: {
    burgerShow (newValue) {
      this.toggleShow(newValue)
    }
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
    toggleShow (show) {
      const right = show ? ' -3rem' : '-100vw'
      gsap.to('.contact', {
        duration: 1.5,
        right,
        delay: show ? 0.7 : 0.5
      })
    }
  }
}
</script>

<style lang="stylus">
    .contact
      position: fixed
      bottom: -3rem
      right: -3rem
      width: 12rem
      height: 12rem
      transition: filter 0.5s ease
      animation: 0.7s 0.7s backwards showContact
      z-index: 2

      img
          width: 100%
          height: 100%
          position: absolute
          top: 0
          left: 0

          &.smiley
              animation: 20s linear infinite normal rotate

          &.text
              animation: 20s linear infinite reverse rotate

      &:hover
          filter: drop-shadow(-2px 5px 0px main-yellow)

    @media (max-aspect-ratio: 13/10) {
      .contact {
        right: -100vw
      }
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg)
        }
        to {
            transform: rotate(360deg)
        }
    }

    @keyframes showContact {
        from {
            transform: translateX(100%)
        }
        to {
            transform: none
        }
    }
</style>

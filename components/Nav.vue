<template>
  <nav>
    <NuxtLink ref="link" to="/" class="logo">
      <img src="~/assets/images/logo_monogram.svg" alt="Logo of the initials RC in a rounded shape">
    </NuxtLink>
    <ButtonsBurger />
    <BurgerBackground />
    <div class="links">
      <ButtonsLink
        url="/"
        text="my projects"
        type="nuxt"
        decoration="waves"
        custom-class="nav"
      />
      <ButtonsLink
        url="/about"
        text="about me"
        type="nuxt"
        decoration="underline"
        custom-class="nav"
      />
    </div>
  </nav>
</template>

<script>
import { gsap } from 'gsap'
import { mapState } from 'vuex'

export default {
  name: 'Nav',
  props: {
    customClass: { type: String, default: '' }
  },
  computed: mapState(['burgerShow']),
  watch: {
    burgerShow (newValue) {
      this.handleBurgerShow(newValue)
    }
  },
  mounted () {
    this.$refs.link.$el.addEventListener('mouseenter', () => {
      gsap.to('.cursor', {
        duration: 0.5,
        opacity: 0
      })
    })
    this.$refs.link.$el.addEventListener('mouseleave', () => {
      gsap.to('.cursor', {
        duration: 0.5,
        opacity: 1
      })
    })
  },
  methods: {
    handleBurgerShow (show) {
      document.querySelector('nav .links').style.display = 'flex'
      gsap.to('nav .links .link', {
        delay: show ? 1.5 : 0,
        duration: 0.5,
        translateY: show ? 0 : '3rem',
        opacity: show ? 1 : 0,
        stagger: 0.2,
        onComplete: () => {
          if (!this.$store.state.burgerShow) {
            gsap.set(document.querySelector('nav .links'), {
              display: 'none'
            })
            gsap.set(document.querySelectorAll('nav .links .link.nav'), {
              opacity: 0,
              translateY: '3rem'
            })
          }
        },
        onCompleteParams: [show]
      })
    }
  }

}
</script>

<style lang="stylus">
  nav
    width: 100%
    padding: 1rem 2.5rem
    position: fixed
    top: 0
    left: 0
    display: flex
    justify-content: space-between
    align-items: center
    color: carbon
    animation: 0.7s 0.7s backwards showNav

    a.logo
      margin: 0
      transition: filter 0.5s ease

      img
        width: auto
        height: 3.2rem

      &:hover
        filter: drop-shadow(-2px 5px 0px main-yellow)

  @media (max-aspect-ratio: 13/10) {
    nav .links {
      position: fixed
      width: 100%
      height: 100%
      top: 0
      left: 0
      display: flex
      flex-direction: column
      padding: 3rem
      justify-content: center
      align-items: center
      display: none
    }

    nav .links .link {
      opacity: 0
      transform: translateY(3rem)
    }
  }

  @keyframes showNav {
    from {
      transform: translateY(-100%)
    }
    to {
      transform: none
    }
  }
</style>

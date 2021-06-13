<template>
  <nav>
    <NuxtLink ref="link" to="/" class="logo">
      <img src="~/assets/images/logo_monogram.svg" alt="Logo of the initials RC in a rounded shape">
    </NuxtLink>
    <div class="burgerIcon" @click="toggleBurger" />
    <div class="links">
      <BurgerBackground />
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

export default {
  name: 'Nav',
  props: {
    customClass: { type: String, default: '' }
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
    toggleBurger () {
      this.$store.commit('toggleBurger')
      document.querySelector('.links').style.display = 'flex'
      gsap.fromTo('.links .link', {
        translateY: this.$store.state.burgerShow ? '3rem' : 0,
        opacity: this.$store.state.burgerShow ? 0 : 1
      },
      {
        delay: this.$store.state.burgerShow ? 1.5 : 0,
        duration: 0.5,
        translateY: this.$store.state.burgerShow ? 0 : '3rem',
        opacity: this.$store.state.burgerShow ? 1 : 0,
        stagger: 0.2
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

    .burgerIcon
      display: none
      width: 3.2rem
      height: 3.2rem
      background-color: red
      z-index: 2

  @media (max-aspect-ratio: 13/10) {
    .links {
      position: fixed
      width: 100vw
      height: 100vh
      top: 0
      left: 0
      display: flex
      flex-direction: column
      padding: 3rem
      justify-content: center
      align-items: center
      display: none
    }

    .links .link {
      opacity: 0
    }

    nav .burgerIcon {
      display: block
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

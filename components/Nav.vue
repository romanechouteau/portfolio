<template>
  <nav>
    <NuxtLink to="/" class="logo">
      <img src="~/assets/images/logo_monogram.svg" alt="Logo of the initials RC in a rounded shape">
    </NuxtLink>
    <div class="links">
      <NuxtLink to="/">
        my projects
      </NuxtLink>
      <NuxtLink to="/about">
        about me
      </NuxtLink>
    </div>
  </nav>
</template>

<style lang="stylus">
  nav
    width: 100%
    padding: 16px 40px
    position: fixed
    top: 0
    left: 0
    display: flex
    justify-content: space-between
    align-items: center
    color: carbon
    animation: 0.7s 0.7s backwards showNav

    a
      display: inline-block
      color: carbon
      text-decoration: none
      font-weight: bold
      margin-left: 48px
      padding: 8px

      &.logo
        margin: 0

        img
          width: 4rem
          height: auto

  @keyframes showNav {
    from {
      transform: translateY(-100%)
    }
    to {
      transform: none
    }
  }
</style>

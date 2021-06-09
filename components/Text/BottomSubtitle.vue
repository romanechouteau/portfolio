<template>
  <h2 :class="[$store.state.indexPage === 0 ? '' : 'hidden','subtitle']">
    creative developer
  </h2>
</template>

<style lang="stylus" scoped>
  .subtitle
    position: absolute
    bottom: 0
    left: 50%
    padding: 3rem
    font-weight: bold
    color: carbon
    font-size: 1.5rem
    transform: translateX(-50%)
    transition: bottom 0.7s ease
    animation: 0.7s 0.7s backwards showSubtitle

    &.hidden
      bottom: -6rem

  @keyframes showSubtitle {
    from {
      bottom:  -6rem
    }
    to {
      bottom: 0
    }
  }
</style>

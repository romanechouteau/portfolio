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
    padding: 48px
    font-weight: bold
    color: carbon
    font-size: 1.5rem
    transform: translateX(-50%)
    transition: all 0.7s ease

    &.hidden
      bottom: -96px
</style>

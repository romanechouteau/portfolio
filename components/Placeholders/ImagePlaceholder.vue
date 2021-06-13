<template>
  <div class="imagePlaceholder" />
</template>

<style lang="stylus" scoped>
  .imagePlaceholder
    height: 0
    width: 100%

  @media (max-aspect-ratio: 13/10) {
    .container:not(.about) .imagePlaceholder {
      height: calc(80vw / 2 * 3 - 8rem)
    }
    .about .imagePlaceholder {
      margin-top: 3rem
      height: calc(80vw / 2 * 3)
    }
  }
</style>

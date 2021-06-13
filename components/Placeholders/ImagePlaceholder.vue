<template>
  <div class="imagePlaceholder" />
</template>

<style lang="stylus" scoped>
  .imagePlaceholder
    height: 0
    width: 100%

  @media (max-aspect-ratio: 13/10) {
    body .imagePlaceholder {
      height: calc(80vw / 2 * 3 - 8rem)
    }
  }
</style>

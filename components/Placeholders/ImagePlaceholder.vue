<template>
  <div :class="['imagePlaceholder', customClass]" />
</template>

<script>
export default {
  name: 'ImagePlaceholder',
  props: {
    customClass: { type: String, default: '' }
  }
}
</script>

<style lang="stylus" scoped>
  .imagePlaceholder
    height: 0
    width: 100%

  @media (max-aspect-ratio: 13/10) {
    .imagePlaceholder {
      height: calc(80vw / 2 * 3 - 8rem)
      max-height: calc(85vh - 8rem)
    }
    .imagePlaceholder.about {
      margin-top: 3rem
      height: calc(80vw / 2 * 3)
      max-height: 85vh
    }
  }
</style>

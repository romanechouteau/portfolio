<template>
  <h1 :class="['title', hasSubtitle ? 'hasSubtitle' : '', customClass]">
    {{ text }}
  </h1>
</template>

<script>
export default {
  name: 'Title',
  props: {
    text: { type: String, default: '' },
    customClass: { type: String, default: '' },
    hasSubtitle: { type: Boolean, default: false }
  }
}
</script>

<style lang="stylus" scoped>
  .title
    font-size: 4rem
    margin-bottom: 3rem
    user-select: text

    &.hasSubtitle
      margin-bottom: 1.5rem

  @media (max-aspect-ratio: 13/10) {
    body .title {
      position: relative
      left: -5vw
      font-size: 3.5rem
      max-width: 50%
      margin-bottom: 0
    }
  }
</style>

<template>
  <div :class="['container', customClass]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'RightContainer',
  props: {
    customClass: { type: String, default: '' }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    height: 80%
    position: absolute
    left: calc(5vw + 57vh)
    text-align: left
    display: flex
    flex-direction: column
    justify-content: center
    padding: 0 5vw
    max-width: 1000px
    color: carbon

  @media (max-aspect-ratio: 13/10) {
    body .container {
      height: auto
      width: 80%
      left: 50%
      top: 6rem
      transform: translateX(-50%)
      justify-content: flex-start
      max-width: calc(85vh * 2 / 3)
      padding: 1rem 0 4rem 0
    }
  }
</style>

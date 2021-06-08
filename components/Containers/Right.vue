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
</style>

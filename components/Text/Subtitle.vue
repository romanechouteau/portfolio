<template>
  <h2 :class="['subtitle', customClass]">
    {{ text }}
  </h2>
</template>

<script>
export default {
  name: 'Title',
  props: {
    text: { type: String, default: '' },
    customClass: { type: String, default: '' }
  }
}
</script>

<style lang="stylus" scoped>
  .subtitle
    font-size: 2rem
    margin-bottom: 3rem
</style>

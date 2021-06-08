<template>
  <h1 :class="['title', customClass]">
    {{ text }}
  </h1>
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
  .title
    font-size: 4rem
    margin-bottom: 48px
</style>

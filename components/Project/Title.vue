<template>
  <h1 :class="['title', customClass]">
    {{ name }}
  </h1>
</template>

<script>
export default {
  name: 'ProjectTitle',
  props: {
    name: { type: String, default: '' },
    customClass: { type: String, default: '' }
  }
}
</script>

<style lang="stylus" scoped>
  .title
    font-size: 4rem
    margin-bottom: 48px
</style>

<template>
  <p :class="['description', customClass]">
    {{ text }}
  </p>
</template>

<script>
export default {
  name: 'ProjectDescription',
  props: {
    text: { type: String, default: '' },
    customClass: { type: String, default: '' }
  }
}
</script>

<style lang="stylus" scoped>
  .description
    margin-bottom: 24px
</style>

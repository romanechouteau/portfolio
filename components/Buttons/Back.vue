<template>
  <NuxtLink to="/" :class="['back', customClass]">
    back
  </NuxtLink>
</template>

<script>
export default {
  name: 'Back',
  props: {
    customClass: { type: String, default: '' }
  }
}
</script>

<style lang="stylus" scoped>
  .back
      margin-bottom: 24px
</style>

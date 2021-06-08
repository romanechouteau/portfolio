<template>
  <a
    :href="url"
    target="_blank"
    :class="['link', customClass]"
  >
    {{ text }}
  </a>
</template>

<script>
export default {
  name: 'Link',
  props: {
    url: { type: String, default: '' },
    text: { type: String, default: '' },
    customClass: { type: String, default: '' }
  }
}
</script>

<style lang="stylus" scoped>
  .link
    padding: 8px
    margin-right: 8px
    color: carbon
    font-weight: bold
    text-decoration: none
</style>

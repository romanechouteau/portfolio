<template>
  <NuxtLink
    v-if="type === 'nuxt'"
    :to="url"
    :class="['link', customClass]"
  >
    {{ text }}
  </NuxtLink>
  <a
    v-else
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
    type: { type: String, default: '' },
    text: { type: String, default: '' },
    customClass: { type: String, default: '' }
  }
}
</script>

<style lang="stylus" scoped>
  .link
    display: inline-block
    padding: 8px
    color: carbon
    font-weight: bold
    text-decoration: none

    &.about
        margin-right: 48px

    &.nav
        margin-left: 48px

    &.absolute
      position: absolute
      bottom: 25%
      left: 60%
      transform: translateX(calc(50vw + 100%))
      transition: transform 0.7s ease

      .show &
        transform: none
</style>

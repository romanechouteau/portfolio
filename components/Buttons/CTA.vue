<template>
  <NuxtLink
    v-if="type === 'home'"
    :to="`/projects/${slug}`"
    :class="['CTA', 'absolute', customClass]"
  >
    see more
  </NuxtLink>
  <a
    v-else
    :href="url"
    target="_blank"
    :class="['CTA', customClass]"
  >
    see project
  </a>
</template>

<script>
export default {
  name: 'CTA',
  props: {
    url: { type: String, default: '' },
    slug: { type: String, default: '' },
    type: { type: String, default: 'home' },
    customClass: { type: String, default: '' }
  }
}
</script>

<style lang="stylus" scoped>
  .CTA
    font-weight: bold
    color: carbon
    text-decoration: none

    &.absolute
      position: absolute
      bottom: 25%
      left: 60%
      transform: translateX(calc(50vw + 100%))
      transition: transform 0.7s ease

      .show &
        transform: none

</style>

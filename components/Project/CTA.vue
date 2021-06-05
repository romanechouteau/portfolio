<template>
  <NuxtLink
    v-if="type === 'home'"
    :to="`/projects/${slug}`"
    :class="['projectCTA', 'absolute', customClass]"
  >
    see more
  </NuxtLink>
  <a
    v-else
    href="http://www.google.com"
    target="_blank"
    :class="['projectCTA', customClass]"
  >
    see project
  </a>
</template>

<script>
export default {
  name: 'ProjectsCTA',
  props: {
    slug: { type: String, default: '' },
    type: { type: String, default: 'home' },
    customClass: { type: String, default: '' }
  }
}
</script>

<style lang="stylus" scoped>
  .projectCTA
    font-weight: bold
    color: carbon

    &.absolute
      position: absolute
      bottom: 25%
      left: 60%
      transition: transform 0.7s ease

      .hidden &
        transform: translateX(calc(50vw + 100%))

</style>

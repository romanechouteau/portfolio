<template>
  <div class="projectsInfo">
    <div
      v-for="(project, key) in pages"
      :key="key"
      :class="[isSelected(key) ? '' : 'hidden','projectInfo']"
    >
      <h2
        class="projectTitle"
      >
        <span v-for="(word, i) in getName(project.name)" :key="`word-${i}`">
          <span>{{ word }}</span>
        </span>
      </h2>
      <NuxtLink
        :to="`/projects/${project.slug}`"
        class="projectCTA"
      >
        see more
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { isEqual, split } from 'lodash'

export default {
  name: 'ProjectsInfo',
  props: {
    pages: { type: Array, default: () => [] }
  },
  methods: {
    isSelected (key) {
      return isEqual(this.$store.state.indexPage, key + 1)
    },
    getName (name) {
      return split(name, ' ')
    }
  }
}
</script>

<style lang="stylus">
  .projectInfo
    .projectTitle
      font-weight: bold
      color: carbon
      position: absolute
      top: 35%
      right: 55%
      display: flex
      flex-direction: column
      align-items flex-end
      transition: all 0.7s ease

      span
        font-size: 3rem

    .projectCTA
      font-weight: bold
      color: carbon
      position: absolute
      bottom: 25%
      left: 60%
      transition: all 0.7s ease

  .hidden
    .projectTitle
      transform: translateX(calc(-50vw - 100%))

    .projectCTA
      transform: translateX(calc(50vw + 100%))
</style>

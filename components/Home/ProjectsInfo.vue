<template>
  <div class="projectInfo">
    <h2
      v-for="(project, key) in pages"
      :key="key"
      :class="[isSelected(key) ? '' : 'hidden','projectTitle']"
    >
      <span v-for="(word, i) in getName(project.name)" :key="`word-${i}`">
        <span>{{ word }}</span>
      </span>
    </h2>
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

      &.hidden
        transform: translateX(calc(-50vw - 100%))
</style>

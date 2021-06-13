<template>
  <h2
    :class="['projectTitle', customClass]"
  >
    <span v-for="(word, i) in getName(name)" :key="`word-${i}`">
      <span>{{ word }}</span>
    </span>
  </h2>
</template>

<script>
import { split } from 'lodash'

export default {
  name: 'ProjectsTitle',
  props: {
    name: { type: String, default: '' },
    customClass: { type: String, default: '' }
  },
  methods: {
    getName (name) {
      return split(name, ' ')
    }
  }
}
</script>

<style lang="stylus" scoped>
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
      user-select: text
      transform: translateX(calc(-50vw - 100%))
      transition: transform 0.7s ease

      span
        font-size: 3rem
        user-select: text

  .show
    .projectTitle
      transform: none

  @media (max-aspect-ratio: 13/10) {
    .projectInfo .projectTitle {
      right: auto
      left: 5%
      align-items flex-start
    }
  }
</style>

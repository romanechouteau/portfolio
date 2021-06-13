<template>
  <div class="cursorWrapper">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="cursor white">
      <circle vector-effect="non-scaling-stroke" cx="50" cy="50" r="40" class="white" />
    </svg>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="cursor blue">
      <circle vector-effect="non-scaling-stroke" cx="50" cy="50" r="40" class="blue" />
    </svg>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="cursor red">
      <circle vector-effect="non-scaling-stroke" cx="50" cy="50" r="40" class="red" />
    </svg>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="cursor green">
      <circle vector-effect="non-scaling-stroke" cx="50" cy="50" r="40" class="green" />
    </svg>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="cursor yellow">
      <circle vector-effect="non-scaling-stroke" cx="50" cy="50" r="40" class="yellow" />
    </svg>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'CustomCursor',
  mounted () {
    document.addEventListener('mousemove', (event) => {
      gsap.to('.cursor', {
        duration: 0.2,
        top: `${event.clientY}px`,
        left: `${event.clientX}px`,
        stagger: 0.03
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
  .cursor
    width: 64px
    height: 64px
    position: fixed
    pointer-events: none
    top: -64px
    left: 50%
    transform: translate(-50%, -50%)

    &.white
      z-index: 5

    &.blue
      z-index: 4

    &.red
      z-index: 3

    &.green
      z-index: 2

    &.yellow
      z-index: 1

    circle
      stroke-width: 2px
      fill: none

      &.white
        stroke-width: 3px
        stroke: white

      &.blue
        stroke: main-blue

      &.red
        stroke: main-red

      &.green
        stroke: main-green

      &.yellow
        stroke: main-yellow

  @media (max-aspect-ratio: 13/10) {
    .cursorWrapper {
      display: none
    }
  }
</style>

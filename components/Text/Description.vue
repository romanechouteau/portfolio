<template>
  <div :class="['description', customClass]">
    <p v-for="(paragraph, key) in paragraphs" :key="key">
      {{ paragraph }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ProjectDescription',
  props: {
    text: { type: String, default: '' },
    customClass: { type: String, default: '' }
  },
  computed: {
    paragraphs () {
      return this.$props.text.split('<br>')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .description
    margin-bottom: 3rem
    line-height: 1.5
</style>

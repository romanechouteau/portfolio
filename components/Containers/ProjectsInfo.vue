<template>
  <div class="projectsInfo">
    <div
      v-for="(project, key) in pages"
      :key="key"
      :class="[isSelected(key) ? 'show' : '','projectInfo']"
    >
      <TextProjectsTitle
        :name="project.name"
        :custom-class="isSelected(key) ? 'hideRight' : ''"
      />
      <ButtonsLink
        :url="`projects/${project.slug}`"
        text="see more"
        type="nuxt"
        :custom-class="isSelected(key) ? 'hideRight absolute' : 'absolute'"
      />
    </div>
  </div>
</template>

<script>
import { isEqual } from 'lodash'

export default {
  name: 'ProjectsInfo',
  props: {
    pages: { type: Array, default: () => [] }
  },
  methods: {
    isSelected (key) {
      return isEqual(this.$store.state.indexPage, key + 1)
    }
  }
}
</script>

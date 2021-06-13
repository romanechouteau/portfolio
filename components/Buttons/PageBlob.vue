<template>
  <div class="blob" :style="`transform: rotate(${Math.random() * 360}deg)`">
    <Blob />
  </div>
</template>

<script>
import Blob from '~/assets/svgs/page_blob.inline.svg'

export default {
  name: 'PageBlob',
  components: {
    Blob
  }
}
</script>

<style lang="stylus" scoped>
    .button
        .blob
            position: absolute
            width: 100%
            height: 100%
            top: 0
            left: 0

            svg
                width: 100%
                height: 100%

                .stroke
                    fill: carbon

                .fill
                    fill: transparent
                    transition: fill 0.1s ease

        &.selected, &:hover
            .blob
                svg
                    .fill
                        fill: carbon
</style>

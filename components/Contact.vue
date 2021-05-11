<template>
  <a href="mailto:romane.chouteau@gmail.com" class="contact" aria-label="Get in touch with me via email">
    <img src="~/assets/images/smiley_contact.svg" class="smiley" alt="Smiley face">
    <img src="~/assets/images/text_contact.svg" class="text" alt="Get in touch">
  </a>
</template>

<style lang="stylus">
    .contact
        position: fixed
        bottom: -4rem
        right: -4rem
        width: 16rem
        height: 16rem

        img
            width: 100%
            height: 100%
            position: absolute
            top: 0
            left: 0

            &.smiley
                animation: 20s linear infinite normal rotate

            &.text
                animation: 20s linear infinite reverse rotate

    @keyframes rotate {
        from {
            transform: rotate(0deg)
        }
        to {
            transform: rotate(360deg)
        }
    }
</style>

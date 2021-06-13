import projects from './content/projects.json'

const baseUrl = process.env.BASE_URL || 'localhost:3000'
const title = 'romane chouteau ~ creative developer'
const description = 'Hi! I’m Romane Chouteau, a 20 year old creative developer. Here you can discover a few of my projects!'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'romane chouteau ~ creative developer',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: baseUrl },
      { name: 'og:image', content: `${baseUrl}/og_image.png` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@RomaneChouteau' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `${baseUrl}/og_image.png` }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap' }
    ]
  },

  generate: {
    routes () {
      return projects.map((project) => {
        return '/projects/' + project.slug
      })
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/reset',
    '~/assets/css/fonts'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    stylus: [
      '~/assets/css/variables.styl'
    ]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['gsap', 'three/examples/jsm/loaders/FBXLoader'],
    extend (config) {
      if (config.module) {
        config.module.rules.push({ test: /\.(vert|frag)$/i, use: ['raw-loader'] })
        config.module.rules.push({ test: /\.(glb|gltf)$/, use: ['file-loader'] })
        config.module.rules.push({
          test: /\.(fbx|obj)$/,
          use: {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          }
        })
        config.module.rules.push({ test: /\.(ogg|mp3|wav|mpe?g)$/i, use: ['file-loader'] })

        const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
        svgRule.test = /\.(?<!inline\.)(png|jpe?g|gif|webp|svg)$/
        config.module.rules.push({
          test: /\.inline\.svg$/,
          use: [
            'babel-loader',
            'vue-svg-loader'
          ]
        })
      }
    }
  }
}

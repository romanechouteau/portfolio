
import { Scene, WebGLRenderer, sRGBEncoding, WebGLRenderTarget, TextureLoader } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { get, map, find, has } from 'lodash'

import projects from '../../content/projects.json'
import Time from './utils/Time'
import World from './World'
import Camera from './Camera'

const textureLoader = new TextureLoader()
const fbxLoader = new FBXLoader()

export default class App {
  constructor () {
    this.canvas = document.querySelector('#_canvas')
    this.time = new Time()
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2)
    }
    this.sizes.device = this.getDevice()
    this.assets = {
      textures: {},
      models: {}
    }
    this.projects = projects
  }

  async init () {
    await this.loadScene()
    this.setRenderer()
    this.setCamera()
    this.setWorld()
    this.setScroll()
  }

  async loadScene () {
    const textures = [
      'about',
      ...map(projects, project => `project${get(project, 'id') + 1}`)
    ]
    const models = ['pillowlava']

    await Promise.all([
      ...map(textures, async (textureName) => {
        await this.loadTexture(textureName)
      }),
      ...map(models, async (modelName) => {
        await this.loadModel(modelName)
      })
    ])
  }

  async loadTexture (textureName) {
    let imageSrc
    try {
      imageSrc = require(`~/assets/images/textures/${textureName}.png`)
    } catch (err) {
      imageSrc = require(`~/assets/images/textures/${textureName}.jpg`)
    }

    this.assets.textures[textureName] = (await textureLoader.loadAsync(imageSrc))
  }

  async loadModel (modelName) {
    const modelSrc = require(`~/assets/models/${modelName}.fbx`)

    this.assets.models[modelName] = (await fbxLoader.loadAsync(modelSrc))
  }

  setCamera () {
    this.camera = new Camera({
      sizes: this.sizes
    })
    this.scene.add(this.camera.container)
  }

  setRenderer () {
    this.scene = new Scene()
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    this.renderer.outputEncoding = sRGBEncoding
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(this.sizes.pixelRatio)

    this.envFBO = new WebGLRenderTarget(this.sizes.width * this.sizes.pixelRatio, this.sizes.height * this.sizes.pixelRatio)
    this.backFBO = new WebGLRenderTarget(this.sizes.width * this.sizes.pixelRatio, this.sizes.height * this.sizes.pixelRatio)
    this.renderer.autoClear = false

    window.addEventListener('resize', () => {
      this.sizes.width = window.innerWidth
      this.sizes.height = window.innerHeight
      this.sizes.device = this.getDevice()

      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      this.envFBO.setSize(this.sizes.width * this.sizes.pixelRatio, this.sizes.height * this.sizes.pixelRatio)
      this.backFBO.setSize(this.sizes.width * this.sizes.pixelRatio, this.sizes.height * this.sizes.pixelRatio)

      this.camera.resize()
      this.world.resize()
    })

    this.time.on('tick', this.render.bind(this))
  }

  render () {
    this.renderer.clear()

    if (this.world.title) {
      this.camera.camera.layers.set(0)
      this.renderer.setRenderTarget(this.envFBO)
      this.renderer.render(this.scene, this.camera.camera)
      this.renderer.clearDepth()

      this.camera.camera.layers.set(1)
      this.world.title.setBackMaterial()
      this.renderer.setRenderTarget(this.backFBO)
      this.renderer.clearDepth()
      this.renderer.render(this.scene, this.camera.camera)
    }

    this.camera.camera.layers.set(0)
    this.renderer.setRenderTarget(null)
    this.renderer.render(this.scene, this.camera.camera)
    this.renderer.clearDepth()

    if (this.world.title) {
      this.world.title.setFrontMaterial()
      this.camera.camera.layers.set(1)
      this.renderer.render(this.scene, this.camera.camera)
    }
  }

  setWorld () {
    this.world = new World({
      time: this.time,
      sizes: this.sizes,
      assets: this.assets,
      camera: this.camera,
      envMap: this.envFBO.texture,
      backMap: this.backFBO.texture
    })
    this.scene.add(this.world.container)
  }

  getDevice () {
    if (this.sizes.width < this.sizes.height * 1.3) {
      return 'mobile'
    }
    return 'desktop'
  }

  setScroll () {
    const onScroll = (event) => {
      const window = find(event.path, path => has(path, 'pageYOffset'))
      const offset = (get(window, 'pageYOffset', 0) / this.sizes.height) * 8
      this.camera.scroll(offset)
      this.world.scroll(offset)
    }
    document.addEventListener('scroll', onScroll)
    document.addEventListener('touchmove', onScroll)
  }
}

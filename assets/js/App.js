
import { Scene, WebGLRenderer, sRGBEncoding, WebGLRenderTarget } from 'three'
import Time from './utils/Time'
import World from './World'
import Camera from './Camera'

export default class App {
  constructor () {
    this.canvas = document.querySelector('#_canvas')
    this.time = new Time()
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.setRenderer()
    this.setCamera()
    this.setWorld()
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
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    this.envFBO = new WebGLRenderTarget(this.sizes.width, this.sizes.height)
    this.backFBO = new WebGLRenderTarget(this.sizes.width, this.sizes.height)
    this.renderer.autoClear = false

    window.addEventListener('resize', () => {
      this.sizes.width = window.innerWidth
      this.sizes.height = window.innerHeight

      // TODO webGLRenderTarget resize + all other resize
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.camera.resize()
    })

    this.time.on('tick', this.render.bind(this))
  }

  render () {
    this.renderer.clear()

    this.camera.camera.layers.set(0)
    this.renderer.setRenderTarget(this.envFBO)
    this.renderer.render(this.scene, this.camera.camera)

    this.camera.camera.layers.set(1)
    this.world.title.setBackMaterial()
    this.renderer.setRenderTarget(this.backFBO)
    this.renderer.clearDepth()
    this.renderer.render(this.scene, this.camera.camera)

    this.camera.camera.layers.set(0)
    this.renderer.setRenderTarget(null)
    this.renderer.render(this.scene, this.camera.camera)
    this.renderer.clearDepth()

    this.camera.camera.layers.set(1)
    this.world.title.setFrontMaterial()
    this.renderer.render(this.scene, this.camera.camera)
  }

  setWorld () {
    this.world = new World({
      time: this.time,
      envMap: this.envFBO.texture,
      backMap: this.backFBO.texture,
      resolution: [
        this.sizes.width * Math.min(window.devicePixelRatio, 2),
        this.sizes.height * Math.min(window.devicePixelRatio, 2)
      ]
    })
    this.scene.add(this.world.container)
  }
}

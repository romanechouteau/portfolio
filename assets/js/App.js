
import { Scene, WebGLRenderer, sRGBEncoding } from 'three'
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

    window.addEventListener('resize', () => {
      this.sizes.width = window.innerWidth
      this.sizes.height = window.innerHeight

      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    this.time.on('tick', this.render.bind(this))
  }

  render () {
    this.renderer.render(this.scene, this.camera.camera)
  }

  setWorld () {
    this.world = new World()
    this.scene.add(this.world.container)
  }
}

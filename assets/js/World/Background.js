import { Mesh, ShaderMaterial, Object3D, PlaneGeometry, Color } from 'three'
import { gsap } from 'gsap'

import { getSizeAtZ } from '../utils/Size'
import vertexShader from '~/assets/shaders/background.vert'
import fragmentShader from '~/assets/shaders/background.frag'

export default class Background {
  constructor ({ sizes, camera, time }) {
    this.container = new Object3D()
    this.container.name = 'Background'

    this.time = time
    this.sizes = sizes
    this.camera = camera

    this.setBackground()
    this.setMovement()
  }

  getBackgroundSize () {
    const z = -5
    const { width, height } = getSizeAtZ(z, this.camera.camera, this.sizes)

    return { width, height, z }
  }

  setBackground () {
    const dimensions = this.getBackgroundSize()

    const geometry = new PlaneGeometry(1, 1, 20, 20)
    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        color1: { value: new Color(0xBFC8FF) },
        color2: { value: new Color(0xFFBFC8) },
        color3: { value: new Color(0xFFF6BF) },
        color4: { value: new Color(0xC3F8DA) }
      }
    })

    this.background = new Mesh(geometry, this.material)
    this.background.position.set(0, 0, dimensions.z)
    this.background.scale.set(dimensions.width, dimensions.height, 1)

    this.container.add(this.background)
  }

  setMovement () {
    this.time.on('tick', () => {
      this.material.uniforms.uTime.value += 0.01
    })
  }

  resize () {
    const dimensions = this.getBackgroundSize()
    this.background.position.set(0, 0, dimensions.z)
    this.background.scale.set(dimensions.width, dimensions.height, 1)
  }

  scroll (offset) {
    gsap.to(this.container.position, {
      y: -offset,
      duration: 0.1
    })
  }
}

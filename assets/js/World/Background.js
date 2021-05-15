import { Mesh, ShaderMaterial, Object3D, PlaneGeometry, Color } from 'three'

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
    const cameraZ = this.camera.camera.position.z
    const z = -5
    const distance = cameraZ - z

    const aspect = this.sizes.width / this.sizes.height
    const vFov = this.camera.camera.fov * Math.PI / 180

    const height = 2 * Math.tan(vFov / 2) * distance
    const width = height * aspect
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
}

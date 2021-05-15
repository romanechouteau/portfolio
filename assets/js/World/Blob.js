import { Mesh, Object3D, ShaderMaterial, SphereGeometry } from 'three'

import vertexShader from '~/assets/shaders/blob.vert'
import fragmentShader from '~/assets/shaders/blob.frag'

export default class Blob {
  constructor ({ time, position, scale, offset, color1, color2 }) {
    this.container = new Object3D()
    this.container.name = 'Blob'

    this.time = time
    this.scale = scale
    this.color1 = color1
    this.color2 = color2
    this.offset = offset
    this.position = position

    this.setBlob()
    this.setMovement()
  }

  setBlob () {
    const geometry = new SphereGeometry(1, 64, 64)
    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        color1: { value: this.color1 },
        color2: { value: this.color2 },
        offset: { value: this.offset },
        uTime: { value: 0 }
      }
    })

    this.blob = new Mesh(geometry, this.material)
    this.blob.position.set(...this.position)
    this.blob.scale.set(...this.scale)

    this.container.add(this.blob)
  }

  setMovement () {
    this.time.on('tick', () => {
      this.material.uniforms.uTime.value += 0.001
    })
  }
}

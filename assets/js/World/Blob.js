import { Mesh, Object3D, ShaderMaterial, SphereGeometry } from 'three'
import { gsap } from 'gsap'
import { get } from 'lodash'

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
    this.color1Target = color1
    this.color2Target = color2
    this.offset = offset
    this.position = position

    this.setBlob()
    this.setMovement()
    this.updateBlob = this.updateBlob.bind(this)
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
    this.blob.position.set(15, this.position[1], this.position[2])
    this.blob.scale.set(...this.scale)

    this.container.add(this.blob)
  }

  setMovement () {
    this.time.on('tick', () => {
      this.material.uniforms.uTime.value += 0.001
      this.color1.lerp(this.color1Target, 0.05)
      this.color2.lerp(this.color2Target, 0.05)
      this.material.uniforms.color1.value = this.color1
      this.material.uniforms.color2.value = this.color2
    })
  }

  updateBlob (data) {
    const scale = get(data, 'scale')
    const position = get(data, 'position')
    const color1 = get(data, 'color1')
    const color2 = get(data, 'color2')
    const duration = 1.5

    if (scale) {
      gsap.to(this.blob.scale, {
        duration,
        x: scale[0],
        y: scale[1],
        z: scale[2],
        ease: 'elastic.out(1, 0.5)'
      })
    }
    if (position) {
      gsap.to(this.blob.position, {
        duration,
        x: position[0],
        y: position[1],
        z: position[2],
        ease: 'elastic.out(1, 0.5)'
      })
      this.position = position
    }
    if (color1) {
      this.color1Target = color1
    }
    if (color2) {
      this.color2Target = color2
    }
  }

  show () {
    gsap.to(this.blob.position, {
      delay: 0.5,
      duration: 1.5,
      x: this.position[0],
      ease: 'elastic.out(1, 0.5)'
    })
  }

  hide () {
    gsap.to(this.blob.position, {
      duration: 1.5,
      x: 15,
      ease: 'elastic.out(1, 0.5)'
    })
  }
}

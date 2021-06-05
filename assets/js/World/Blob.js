import { Mesh, Object3D, ShaderMaterial, SphereGeometry } from 'three'
import { gsap } from 'gsap'
import { get } from 'lodash'

import { getObjectDimensions, getSizeAtZ } from '../utils/Size'
import vertexShader from '~/assets/shaders/blob.vert'
import fragmentShader from '~/assets/shaders/blob.frag'

export default class Blob {
  constructor ({ time, sizes, camera, position, scale, offset, color1, color2 }) {
    this.container = new Object3D()
    this.container.name = 'Blob'

    this.time = time
    this.sizes = sizes
    this.scale = scale
    this.camera = camera
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
    geometry.computeBoundingBox()

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
    this.blob.scale.set(...this.scale)

    const { x, y } = this.getBlobHiddenPosition()
    this.blob.position.set(x, y, this.position[2])
    this.show()

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

  updateBlob (data, delay = 0) {
    const scale = get(data, 'scale')
    const position = get(data, 'position')
    const color1 = get(data, 'color1')
    const color2 = get(data, 'color2')
    const duration = 1.5

    if (scale) {
      gsap.to(this.blob.scale, {
        delay,
        duration,
        x: scale[0],
        y: scale[1],
        z: scale[2],
        ease: 'elastic.out(1, 0.5)'
      })
    }
    if (position) {
      gsap.to(this.blob.position, {
        delay,
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
      delay: 0.7,
      duration: 1.5,
      x: this.position[0],
      y: this.position[1],
      z: this.position[2],
      ease: 'elastic.out(1, 0.5)'
    })
  }

  hide () {
    const { x, y } = this.getBlobHiddenPosition()
    gsap.to(this.blob.position, {
      duration: 1.5,
      x,
      y,
      ease: 'elastic.out(1, 0.5)'
    })
  }

  getBlobHiddenPosition () {
    const angle = Math.atan2(this.position[1], this.position[0])
    const matrix = this.blob.matrixWorld.clone()
    const { width, height } = getObjectDimensions(
      this.blob,
      matrix
    )
    const { width: windowWidth, height: windowHeight } = getSizeAtZ(this.position[2], this.camera.camera, this.sizes)
    const r = Math.max(windowWidth, windowHeight) + Math.max(width, height)

    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r }
  }
}

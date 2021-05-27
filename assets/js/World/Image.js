import { LoadingManager, Mesh, Object3D, PlaneGeometry, ShaderMaterial, TextureLoader } from 'three'
import { gsap } from 'gsap'
import { isEqual } from 'lodash'

import vertexShader from '../../shaders/image.vert'
import fragmentShader from '../../shaders/image.frag'
import { IMAGE_PROJECT_SETUP_SCALE, IMAGE_PROJECT_SETUP_X } from '../config'

const manager = new LoadingManager()
const textureLoader = new TextureLoader(manager)

export default class Image {
  constructor ({ key, time }) {
    this.container = new Object3D()
    this.container.name = 'Image'

    this.key = key
    this.time = time
    this.hidden = true

    this.setImage()
    this.setMovement()
  }

  setImage () {
    const geometry = new PlaneGeometry(3.33, 5, 10, 10)

    try {
      this.imageSrc = require(`~/assets/images/project${this.key}.jpg`)
    } catch (err) {
      this.imageSrc = require('~/assets/images/project1.jpg')
    }

    this.texture = textureLoader.load(this.imageSrc)

    this.material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 1.0 },
        uTexture: { type: 't', value: this.texture }
      },
      vertexShader,
      fragmentShader
    })
    this.image = new Mesh(geometry, this.material)

    this.container.add(this.image)
  }

  show () {
    if (isEqual(this.hidden, true)) {
      this.hidden = false
      gsap.to(this.image.position, {
        duration: 1.5,
        y: 0,
        ease: 'elastic.out(1, 0.5)'
      })
    }
  }

  hide (direction) {
    if (isEqual(this.hidden, false)) {
      this.hidden = true
      gsap.to(this.image.position, {
        duration: 1.5,
        y: 10 * direction,
        ease: 'elastic.out(1, 0.5)'
      })
    }
  }

  resetImageY (direction) {
    this.image.position.y = 10 * direction
  }

  resetImageX (direction) {
    this.image.position.x = 10 * direction
  }

  setImageCenterX () {
    this.image.position.x = 0
  }

  setMovement () {
    this.time.on('tick', () => {
      this.material.uniforms.uTime.value += 0.005
    })
  }

  showProjectSetup () {
    this.hidden = false

    gsap.to(this.image.scale, {
      duration: 1.5,
      x: IMAGE_PROJECT_SETUP_SCALE,
      y: IMAGE_PROJECT_SETUP_SCALE,
      z: IMAGE_PROJECT_SETUP_SCALE,
      ease: 'elastic.out(1, 0.5)'
    })
    gsap.to(this.image.position, {
      duration: 1.5,
      x: IMAGE_PROJECT_SETUP_X,
      y: 0,
      ease: 'elastic.out(1, 0.5)'
    })
  }

  hideProjectSetup () {
    this.hidden = true

    gsap.to(this.image.scale, {
      duration: 1.5,
      x: 1,
      y: 1,
      z: 1,
      ease: 'elastic.out(1, 0.5)'
    })
    gsap.to(this.image.position, {
      duration: 1.5,
      x: -10,
      y: 0,
      ease: 'elastic.out(1, 0.5)',
      onComplete: () => {
        this.resetImageY(-1)
        this.setImageCenterX()
      }
    })
  }
}

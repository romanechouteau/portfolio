import { LoadingManager, Mesh, Object3D, PlaneGeometry, ShaderMaterial, TextureLoader } from 'three'
import { gsap } from 'gsap'

import vertexShader from '../../shaders/image.vert'
import fragmentShader from '../../shaders/image.frag'

const manager = new LoadingManager()
const textureLoader = new TextureLoader(manager)

export default class Image {
  constructor ({ key }) {
    this.container = new Object3D()
    this.container.name = 'Image'

    this.key = key
    this.hidden = true

    this.setImage()
  }

  setImage () {
    const geometry = new PlaneGeometry(3.33, 5)

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
    this.image.position.y = -10
    this.resetImage(-1)

    this.container.add(this.image)
  }

  show () {
    this.hidden = false
    gsap.to(this.image.position, {
      duration: 1.5,
      y: 0,
      ease: 'elastic.out(1, 0.5)'
    })
  }

  hide (direction) {
    this.hidden = true
    gsap.to(this.image.position, {
      duration: 1.5,
      y: 10 * direction,
      ease: 'elastic.out(1, 0.5)'
    })
  }

  resetImage (direction) {
    this.image.position.y = 10 * direction
  }
}

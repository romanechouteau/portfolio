import { LoadingManager, Mesh, Object3D, PlaneGeometry, ShaderMaterial, TextureLoader } from 'three'
import { gsap } from 'gsap'
import { isEqual, isNumber } from 'lodash'

import vertexShader from '../../shaders/image.vert'
import fragmentShader from '../../shaders/image.frag'
import { IMAGE_PROJECT_SETUP_SCALE } from '../config'
import { getObjectXPositionningData } from '../utils/Size'

const manager = new LoadingManager()
const textureLoader = new TextureLoader(manager)

export default class Image {
  constructor ({ key, time, sizes, camera }) {
    this.container = new Object3D()
    this.container.name = 'Image'

    if (isEqual(key, 'about')) {
      this.key = key
    } else if (isNumber(key)) {
      this.key = `project${key}`
    } else {
      this.key = 'project1'
    }
    this.time = time
    this.sizes = sizes
    this.camera = camera
    this.hidden = true
    this.bigImage = false

    this.setImage()
    this.setMovement()
  }

  setImage () {
    const geometry = new PlaneGeometry(3.33, 5, 10, 10)
    geometry.computeBoundingBox()

    try {
      this.imageSrc = require(`~/assets/images/${this.key}.png`)
    } catch (err) {
      this.imageSrc = require(`~/assets/images/${this.key}.jpg`)
    }

    this.texture = textureLoader.load(this.imageSrc)

    this.material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
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

  setImageCenterY () {
    this.image.position.y = 0
  }

  setMovement () {
    this.time.on('tick', () => {
      this.material.uniforms.uTime.value += 0.005
    })
  }

  showBigImage () {
    this.hidden = false
    this.bigImage = true

    const x = this.getImagePositionLeft()

    gsap.to(this.image.scale, {
      duration: 1.5,
      x: IMAGE_PROJECT_SETUP_SCALE,
      y: IMAGE_PROJECT_SETUP_SCALE,
      z: IMAGE_PROJECT_SETUP_SCALE,
      ease: 'elastic.out(1, 0.5)'
    })
    gsap.to(this.image.position, {
      duration: 1.5,
      x,
      y: 0,
      ease: 'elastic.out(1, 0.5)'
    })
  }

  hideBigImage () {
    this.hidden = true
    this.bigImage = false

    const x = this.getImageHiddenPositionLeft()

    gsap.to(this.image.scale, {
      duration: 1.5,
      x: 1,
      y: 1,
      z: 1,
      ease: 'elastic.out(1, 0.5)'
    })
    gsap.to(this.image.position, {
      duration: 1.5,
      x,
      y: 0,
      ease: 'elastic.out(1, 0.5)',
      onComplete: () => {
        if (isEqual(this.bigImage, false)) {
          this.resetImageY(-1)
          this.setImageCenterX()
        }
      }
    })
  }

  getImagePositionLeft () {
    const matrix = this.image.matrixWorld.clone().makeScale(IMAGE_PROJECT_SETUP_SCALE, IMAGE_PROJECT_SETUP_SCALE, IMAGE_PROJECT_SETUP_SCALE)

    const { width, windowLeft, windowWidth } = getObjectXPositionningData(
      this.camera.camera,
      this.sizes,
      this.image,
      matrix
    )

    return windowLeft + width / 2 + 0.05 * windowWidth
  }

  getImageHiddenPositionLeft () {
    const matrix = this.image.matrixWorld.clone().makeScale(IMAGE_PROJECT_SETUP_SCALE, IMAGE_PROJECT_SETUP_SCALE, IMAGE_PROJECT_SETUP_SCALE)

    const { width, windowLeft } = getObjectXPositionningData(
      this.camera.camera,
      this.sizes,
      this.image,
      matrix
    )

    return windowLeft - width
  }

  resize () {
    if (isEqual(this.bigImage, true)) {
      this.image.position.x = this.getImagePositionLeft()
    }
  }
}

import { Mesh, Object3D, PlaneGeometry, ShaderMaterial } from 'three'
import { gsap } from 'gsap'
import { get, isEqual, isNumber, replace } from 'lodash'

import vertexShader from '../../shaders/image.vert'
import fragmentShader from '../../shaders/image.frag'
import { IMAGE_PROJECT_SETUP_SCALE } from '../config'
import { getObjectXPositionningData, getObjectYPositionningData, getSizeAtZ } from '../utils/Size'

export default class Image {
  constructor ({ key, time, sizes, assets, camera }) {
    this.container = new Object3D()
    this.container.name = 'Image'

    if (isEqual(key, 'about')) {
      this.key = key
    } else if (isNumber(key)) {
      this.key = `project${key}`
    } else {
      this.key = 'project1'
    }
    this.bigY = 0
    this.time = time
    this.sizes = sizes
    this.assets = assets
    this.camera = camera
    this.hidden = true
    this.bigImage = false

    this.setImage()
    this.setMovement()
  }

  setImage () {
    const geometry = new PlaneGeometry(3.33, 5, 10, 10)
    geometry.computeBoundingBox()

    this.texture = get(this.assets.textures, this.key)

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

  setImageToBigY () {
    this.image.position.y = this.bigY
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
    const scale = this.getImageScale()
    const y = this.getImagePositionTop(scale)
    this.bigY = y

    gsap.to(this.image.scale, {
      duration: 1.5,
      x: scale,
      y: scale,
      z: scale,
      ease: 'elastic.out(1, 0.5)'
    })
    gsap.to(this.image.position, {
      duration: 1.5,
      x,
      y,
      ease: 'elastic.out(1, 0.5)'
    })
  }

  hideBigImage () {
    this.hidden = true
    this.bigImage = false

    const x = this.getImageHiddenPositionLeft()
    const scale = this.getImageScale()
    const y = this.getImagePositionTop(scale)
    this.bigY = y

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
      y,
      ease: 'elastic.out(1, 0.5)',
      onComplete: () => {
        if (isEqual(this.bigImage, false)) {
          this.resetImageY(-1)
          this.setImageCenterX()
        }
      }
    })
  }

  getImageScale () {
    if (isEqual(this.sizes.device, 'mobile')) {
      const { width } = getSizeAtZ(this.image.position.z, this.camera.camera, this.sizes)
      const scale = width * 0.8 / this.image.geometry.parameters.width
      return Math.min(scale, IMAGE_PROJECT_SETUP_SCALE)
    }
    return IMAGE_PROJECT_SETUP_SCALE
  }

  getImagePositionLeft () {
    if (isEqual(this.sizes.device, 'mobile')) {
      return 0
    }

    const matrix = this.image.matrixWorld.clone().makeScale(IMAGE_PROJECT_SETUP_SCALE, IMAGE_PROJECT_SETUP_SCALE, IMAGE_PROJECT_SETUP_SCALE)

    const { width, windowLeft, windowWidth } = getObjectXPositionningData(
      this.camera.camera,
      this.sizes,
      this.image,
      matrix
    )

    return windowLeft + width / 2 + 0.05 * windowWidth
  }

  getImagePositionTop (scale) {
    if (isEqual(this.sizes.device, 'desktop')) {
      return 0
    }

    const matrix = this.image.matrixWorld.clone().makeScale(scale, scale, scale)

    const { height, windowTop, windowHeight } = getObjectYPositionningData(
      this.camera.camera,
      this.image,
      matrix
    )
    const ratio = windowHeight / this.sizes.height

    if (isEqual(this.sizes.device, 'mobile') && isEqual(this.key, 'about')) {
      const margin =
      document.querySelector('.container.about').offsetHeight -
      document.querySelector('.imagePlaceholder.about').offsetHeight +
      document.querySelector('.container.about').offsetTop -
      parseInt(replace(window.getComputedStyle(document.querySelector('.container.about'), null).paddingBottom, 'px', ''), 10)

      return windowTop - height / 2 - margin * ratio
    }

    const margin = document.querySelector('nav').offsetHeight + 64

    return windowTop - height / 2 - margin * ratio
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
      const scale = this.getImageScale()
      this.image.position.y = this.getImagePositionTop(scale)
      this.image.scale.set(scale, scale, scale)
    }
  }

  scrollHidden (offset) {
    if (isEqual(this.hidden, true)) {
      this.container.position.y = -offset
    }
  }
}

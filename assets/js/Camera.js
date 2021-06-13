
import { Object3D, PerspectiveCamera } from 'three'
import { gsap } from 'gsap'

export default class Camera {
  constructor ({ sizes }) {
    this.sizes = sizes

    this.container = new Object3D()
    this.container.name = 'Camera'

    this.setCamera()
  }

  setCamera () {
    this.camera = new PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    )

    this.camera.position.set(0, 0, 10)

    this.container.add(this.camera)
  }

  resize () {
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()
  }

  scroll (offset) {
    gsap.to(this.container.position, {
      y: -offset,
      duration: 0.2
    })
  }
}

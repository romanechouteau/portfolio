
import { Object3D, PerspectiveCamera } from 'three'

export default class Camera {
  constructor ({ sizes }) {
    this.sizes = sizes

    this.container = new Object3D()
    this.container.name = 'Camera'

    this.setCamera()
  }

  setCamera () {
    this.camera = new PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    )
    this.camera.position.set(0, 0, 5)
    this.container.add(this.camera)
  }

  resize () {
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()
  }
}

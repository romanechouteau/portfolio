import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from 'three'

export default class Cube {
  constructor ({ time }) {
    this.container = new Object3D()
    this.container.name = 'Cube'

    this.time = time

    this.setCube()
    this.setMovement()
  }

  setCube () {
    const geometry = new BoxGeometry(5, 4, 1)
    const material = new MeshBasicMaterial({ color: 0xFF0000 })
    this.cube = new Mesh(geometry, material)
    this.cube.position.set(3, 0, -2)
    this.container.add(this.cube)
  }

  setMovement () {
    this.time.on('tick', () => {

    })
  }
}

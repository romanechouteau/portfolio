import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from 'three'

export default class Cube {
  constructor () {
    this.container = new Object3D()
    this.container.name = 'Cube'

    this.setCube()
  }

  setCube () {
    const geometry = new BoxGeometry(10, 4, 1)
    const material = new MeshBasicMaterial({ color: 0xFF0000 })
    this.cube = new Mesh(geometry, material)
    this.cube.position.set(0, 0, -4)
    this.container.add(this.cube)
  }
}

import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from 'three'

export default class World {
  constructor () {
    this.container = new Object3D()
    this.container.name = 'Cube'

    this.setCube()
  }

  setCube () {
    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({ color: 0xFF0000 })
    this.cube = new Mesh(geometry, material)
    this.container.add(this.cube)
  }
}

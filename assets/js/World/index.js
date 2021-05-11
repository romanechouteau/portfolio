import { Object3D } from 'three'
import AmbiantLight from './AmbiantLight'
import Cube from './Cube'

export default class World {
  constructor () {
    this.container = new Object3D()
    this.container.name = 'World'

    this.setAmbiantLight()
    this.setIndex = this.setIndex.bind(this)
  }

  setAmbiantLight () {
    this.ambiantLight = new AmbiantLight()
    this.container.add(this.ambiantLight.container)
  }

  setIndex () {
    this.setCube()
  }

  setCube () {
    this.cube = new Cube()
    this.container.add(this.cube.container)
  }
}

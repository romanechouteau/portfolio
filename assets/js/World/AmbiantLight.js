import { Object3D, AmbientLight } from 'three'

export default class AmbiantLight {
  constructor () {
    this.container = new Object3D()
    this.container.name = 'Ambiant Light'

    this.setAmbiantLight()
  }

  setAmbiantLight () {
    this.light = new AmbientLight(0xFFFFFF, 1)
    this.container.add(this.light)
  }
}

import { Object3D, PointLight, PointLightHelper } from 'three'

export default class AmbiantLight {
  constructor () {
    this.container = new Object3D()
    this.container.name = 'Ambiant Light'

    this.setAmbiantLight()
  }

  setAmbiantLight () {
    this.light = new PointLight(0xFFFFFF, 5, 100)
    this.light.position.set(4, 2, 5)

    const pointLightHelper = new PointLightHelper(this.light)
    this.container.add(this.light, pointLightHelper)
  }
}

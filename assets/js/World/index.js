import { Object3D } from 'three'

import Cube from './Cube'
import Title from './Title'
import PointLight from './PointLight'
import AmbiantLight from './AmbiantLight'

export default class World {
  constructor ({ time, envMap, backMap, resolution }) {
    this.container = new Object3D()
    this.container.name = 'World'

    this.time = time
    this.envMap = envMap
    this.backMap = backMap
    this.resolution = resolution

    this.setAmbiantLight()
    this.setPointLight()
    this.setIndex = this.setIndex.bind(this)
  }

  setAmbiantLight () {
    this.ambiantLight = new AmbiantLight()
    this.container.add(this.ambiantLight.container)
  }

  setPointLight () {
    this.pointLight = new PointLight()
    this.container.add(this.pointLight.container)
  }

  setIndex () {
    this.setCube()
    this.setTitle()
  }

  setTitle () {
    this.title = new Title({
      time: this.time,
      envMap: this.envMap,
      backMap: this.backMap,
      resolution: this.resolution
    })
    this.container.add(this.title.container)
  }

  setCube () {
    this.cube = new Cube()
    this.container.add(this.cube.container)
  }
}

import { Object3D } from 'three'

import Cube from './Cube'
import Title from './Title'
import Background from './Background'
import PointLight from './PointLight'
import AmbiantLight from './AmbiantLight'

export default class World {
  constructor ({ time, sizes, camera, envMap, backMap }) {
    this.container = new Object3D()
    this.container.name = 'World'

    this.time = time
    this.sizes = sizes
    this.camera = camera
    this.envMap = envMap
    this.backMap = backMap

    this.setBackground()
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
      sizes: this.sizes,
      envMap: this.envMap,
      backMap: this.backMap
    })
    this.container.add(this.title.container)
  }

  setCube () {
    this.cube = new Cube({
      time: this.time
    })
    this.container.add(this.cube.container)
  }

  setBackground () {
    this.background = new Background({
      time: this.time,
      sizes: this.sizes,
      camera: this.camera
    })
    this.container.add(this.background.container)
  }
}

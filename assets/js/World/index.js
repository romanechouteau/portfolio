import { Object3D } from 'three'

import Title from './Title'
import Blobs from './Blobs'
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
    this.setBlobs()
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

  setBlobs () {
    this.blobs = new Blobs({
      time: this.time
    })
    this.container.add(this.blobs.container)
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

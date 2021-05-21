import { Object3D } from 'three'
import { isUndefined, nth } from 'lodash'

import { INDEX_BLOBS_DATA } from '../config'
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
    this.setIndexProject = this.setIndexProject.bind(this)
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
    if (isUndefined(this.blobs)) {
      this.setBlobs(nth(INDEX_BLOBS_DATA, 0))
    } else {
      this.blobs.updateBlobs(nth(INDEX_BLOBS_DATA, 0))
    }
    if (isUndefined(this.title)) {
      this.setTitle()
    } else {
      this.title.show()
    }
  }

  setIndexProject (key) {
    this.blobs.updateBlobs(nth(INDEX_BLOBS_DATA, key))
    if (this.title.inFrame) {
      this.title.hide()
    }
  }

  setTitle () {
    if (isUndefined(this.title)) {
      this.title = new Title({
        time: this.time,
        sizes: this.sizes,
        envMap: this.envMap,
        backMap: this.backMap
      })
      return this.container.add(this.title.container)
    }
  }

  setBlobs (blobsData) {
    if (isUndefined(this.blobs)) {
      this.blobs = new Blobs({
        time: this.time,
        blobsData
      })
      return this.container.add(this.blobs.container)
    }
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

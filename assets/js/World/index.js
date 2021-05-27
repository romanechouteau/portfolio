import { Object3D } from 'three'
import { get, isUndefined, map, nth } from 'lodash'

import { INDEX_BLOBS_DATA } from '../config'
import projects from '../../../content/projects.json'
import Title from './Title'
import Blobs from './Blobs'
import Image from './Image'
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

    this.key = -1
    this.projects = projects

    this.setBackground()
    this.setAmbiantLight()
    this.setPointLight()
    this.setIndex = this.setIndex.bind(this)
    this.setIndexProject = this.setIndexProject.bind(this)
    this.removeContainer = this.removeContainer.bind(this)
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

    if (isUndefined(this.images)) {
      this.setImages()
    } else if (this.images[this.key] && get(this.images[this.key], 'hidden', false) === false) {
      const direction = this.key === this.images.length - 1 ? 1 : -1
      this.images[this.key].hide(direction)
    }

    this.key = -1
  }

  setIndexProject (key) {
    this.blobs.updateBlobs(nth(INDEX_BLOBS_DATA, key))

    const direction = this.key <= key - 1 ? 1 : -1

    const currentImage = this.images[this.key]
    const nextImage = this.images[key - 1]

    if (!isUndefined(currentImage)) {
      currentImage.hide(direction)
    }
    if (!isUndefined(nextImage)) {
      nextImage.resetImage(-direction)
      nextImage.show()
    }
    if (this.title.inFrame) {
      this.title.hide()
    }

    this.key = key - 1
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

  setImages () {
    this.images = map(this.projects, (_, key) => new Image({
      key: key + 1,
      time: this.time
    }))
    this.container.add(...map(this.images, image => image.container))
  }

  setBackground () {
    this.background = new Background({
      time: this.time,
      sizes: this.sizes,
      camera: this.camera
    })
    this.container.add(this.background.container)
  }

  removeContainer (object) {
    this.container.remove(object)
  }
}

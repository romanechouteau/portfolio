import { Object3D } from 'three'
import { get, isUndefined, map, nth, forEach } from 'lodash'

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
    this.setAbout = this.setAbout.bind(this)
    this.setIndex = this.setIndex.bind(this)
    this.hideAbout = this.hideAbout.bind(this)
    this.hideIndex = this.hideIndex.bind(this)
    this.setProject = this.setProject.bind(this)
    this.hideProject = this.hideProject.bind(this)
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

  setIndex (hasDelay) {
    if (isUndefined(this.blobs)) {
      this.setBlobs(nth(INDEX_BLOBS_DATA, 0))
      this.blobs.show()
    } else {
      const delay = hasDelay ? 0.5 : 0
      this.blobs.updateBlobs(nth(INDEX_BLOBS_DATA, 0), delay)
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
      nextImage.resetImageY(-direction)
      nextImage.show()
    }
    if (this.title.inFrame) {
      this.title.hide()
    }

    this.key = key - 1
  }

  hideIndex () {
    if (!isUndefined(this.blobs)) {
      this.blobs.hide()
    }
    if (!isUndefined(this.title) && this.title.inFrame) {
      this.title.hide()
    }
    if (!isUndefined(this.images)) {
      forEach(this.images, (image) => {
        image.hide(-1)
      })
    }
  }

  setProject (index) {
    if (isUndefined(this.images)) {
      this.setImage('image', index + 1)
    } else {
      this.image = nth(this.images, index)
      this.moveImage('image')
    }

    this.key = index
  }

  hideProject () {
    if (!isUndefined(this.image)) {
      this.image.hideBigImage()
    }
  }

  setAbout () {
    if (isUndefined(this.aboutImage)) {
      this.setImage('aboutImage', 'about')
    } else {
      this.aboutImage.resetImageX(-1)
      this.aboutImage.setImageCenterY()
      this.moveImage('aboutImage')
    }
  }

  hideAbout () {
    if (!isUndefined(this.aboutImage)) {
      this.aboutImage.hideBigImage()
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
        sizes: this.sizes,
        camera: this.camera,
        blobsData
      })
      return this.container.add(this.blobs.container)
    }
  }

  setImages () {
    this.images = map(this.projects, (_, key) => {
      const img = new Image({
        key: key + 1,
        time: this.time,
        sizes: this.sizes,
        camera: this.camera
      })
      img.resetImageY(-1)
      return img
    })
    this.container.add(...map(this.images, image => image.container))
  }

  setImage (classKey, key) {
    this[classKey] = new Image({
      key,
      time: this.time,
      sizes: this.sizes,
      camera: this.camera
    })
    this[classKey].resetImageX(-1)
    this.container.add(this[classKey].container)

    this.moveImage(classKey)
  }

  moveImage (classKey) {
    this[classKey].showBigImage()
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

  resize () {
    if (!isUndefined(this.title)) {
      this.title.resize()
    }
    if (!isUndefined(this.background)) {
      this.background.resize()
    }
    if (!isUndefined(this.image)) {
      this.image.resize()
    }
    if (!isUndefined(this.aboutImage)) {
      this.aboutImage.resize()
    }
  }
}

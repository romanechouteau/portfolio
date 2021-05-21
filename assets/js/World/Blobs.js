import { Object3D } from 'three'
import { map, forEach } from 'lodash'

import Blob from './Blob'

export default class Blobs {
  constructor ({ time, blobsData }) {
    this.container = new Object3D()
    this.container.name = 'Blobs'

    this.time = time
    this.blobsData = blobsData

    this.setBlobs()
    this.updateBlobs = this.updateBlobs.bind(this)
  }

  setBlobs () {
    this.blobs = map(this.blobsData, ({ scale, color1, color2, position }, offset) => {
      return new Blob({
        time: this.time,
        scale,
        color1,
        color2,
        position,
        offset
      })
    })

    this.container.add(...map(this.blobs, blob => blob.container))
  }

  updateBlobs (data) {
    forEach(data, (blob, index) => {
      this.blobs[index].updateBlob(blob)
    })
  }
}

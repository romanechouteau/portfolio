import { Object3D, Color } from 'three'
import { map } from 'lodash'

import {
  MAIN_BLUE, SECONDARY_BLUE, MAIN_RED, SECONDARY_RED,
  MAIN_YELLOW, SECONDARY_YELLOW, MAIN_GREEN, SECONDARY_GREEN
} from '../config'

import Blob from './Blob'

const BLOBS_DATA = [
  {
    scale: [4, 2, 0.5],
    color1: new Color(MAIN_BLUE),
    color2: new Color(SECONDARY_BLUE),
    position: [3, -1, -2]
  },
  {
    scale: [3, 2, 0.5],
    color1: new Color(MAIN_RED),
    color2: new Color(SECONDARY_RED),
    position: [-4, 1, -2]
  },
  {
    scale: [1.3, 1, 0.5],
    color1: new Color(MAIN_YELLOW),
    color2: new Color(SECONDARY_YELLOW),
    position: [5.5, 1, -1]
  },
  {
    scale: [2.2, 1.5, 0.5],
    color1: new Color(MAIN_YELLOW),
    color2: new Color(SECONDARY_YELLOW),
    position: [-2, -2, -1]
  },
  {
    scale: [2, 1.1, 0.5],
    color1: new Color(MAIN_GREEN),
    color2: new Color(SECONDARY_GREEN),
    position: [2, 1.5, -1.5]
  },
  {
    scale: [1, 0.8, 0.5],
    color1: new Color(MAIN_BLUE),
    color2: new Color(SECONDARY_BLUE),
    position: [-0.5, 1.8, 0.5]
  }
]

export default class Blobs {
  constructor ({ time }) {
    this.container = new Object3D()
    this.container.name = 'Blobs'

    this.time = time

    this.setBlobs()
  }

  setBlobs () {
    this.blobs = map(BLOBS_DATA, ({ scale, color1, color2, position }, offset) => {
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
}

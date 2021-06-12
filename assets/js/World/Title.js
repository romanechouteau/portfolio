import { Object3D, ShaderMaterial } from 'three'
import { gsap } from 'gsap'
import { find, forEach, get, isEqual, last, map, reduce, reverse } from 'lodash'

import { getSizeAtZ } from '../utils/Size'
import vertexShader from '~/assets/shaders/glass.vert'
import fragmentShader from '~/assets/shaders/glass.frag'
import normalVertexShader from '~/assets/shaders/normal.vert'
import normalFragmentShader from '~/assets/shaders/normal.frag'

export default class Title {
  constructor ({ time, assets, camera, sizes, envMap, backMap }) {
    this.container = new Object3D()
    this.container.name = 'Title'

    this.time = time
    this.sizes = sizes
    this.assets = assets
    this.camera = camera
    this.envMap = envMap
    this.backMap = backMap
    this.inFrame = true
    this.resolution = [
      this.sizes.width * this.sizes.pixelRatio,
      this.sizes.height * this.sizes.pixelRatio
    ]
    this.letterPositions = []

    this.resize = this.resize.bind(this)
    this.setFrontMaterial = this.setFrontMaterial.bind(this)
    this.setBackMaterial = this.setBackMaterial.bind(this)

    this.setTitle()
  }

  findByName (group, names) {
    return find(get(group, 'children'), child => reduce(names, (acc, name) => acc || isEqual(get(child, 'name'), name), false))
  }

  setTitle () {
    const alphabet = this.assets.models.pillowlava
    const letters = this.findByName(alphabet, ['a_z'])
    this.romane = map('romane', letter => this.findByName(letters, [`pilowlava_${letter}_for_sds`, `pilowlava_${letter}1_for_sds`]).clone())
    this.chouteau = map('chouteau', letter => this.findByName(letters, [`pilowlava_${letter}_for_sds`, `pilowlava_${letter}1_for_sds`]).clone())

    this.frontMaterial = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uEnvMap: { value: this.envMap },
        uBackMap: { value: this.backMap },
        uResolution: { value: this.resolution },
        uIor: { value: 2.33 }
      }
    })
    this.backMaterial = new ShaderMaterial({
      vertexShader: normalVertexShader,
      fragmentShader: normalFragmentShader
    })

    this.setLetters(this.romane, 0.2, 0.25)
    this.setLetters(this.chouteau, -1.2, 0.25)

    this.setMovement()

    this.show()

    this.container.add(...this.romane, ...this.chouteau)
  }

  setLetters (word, y) {
    const space = 0.1
    const scale = 0.25

    const widths = map(word, (letter) => {
      letter.geometry.computeBoundingBox()
      letter.material = this.material
      letter.layers.set(1)
      return get(letter, 'geometry.boundingBox.max.x', 0) * scale - get(letter, 'geometry.boundingBox.min.x', 0) * scale
    })
    const totalWidth = reduce(widths, (acc, width) => acc + width + space, 0)
    const start = -(totalWidth / 2)

    let position = start
    this.letterPositions.push([])
    const { width: windowWidth } = getSizeAtZ(0, this.camera.camera, this.sizes)
    forEach(word, (letter, index) => {
      letter.scale.set(scale, scale, scale)
      letter.position.set(position + windowWidth, y, 0)
      last(this.letterPositions).push(position)
      position += widths[index] + space
    })
  }

  setMovement () {
    this.time.on('tick', () => {
      if (this.inFrame) {
        forEach([this.romane, this.chouteau], (word, i) => {
          forEach(word, (letter, index) => {
            letter.position.y = 0.2 - (1.5 * i) + (Math.sin(index + 0.0006 * this.time.elapsed) * 0.15)
          })
        })
      }
    })
  }

  setBackMaterial () {
    if (this.romane && this.chouteau) {
      forEach([...this.romane, ...this.chouteau], (letter) => { letter.material = this.backMaterial })
    }
  }

  setFrontMaterial () {
    if (this.romane && this.chouteau) {
      forEach([...this.romane, ...this.chouteau], (letter) => { letter.material = this.frontMaterial })
    }
  }

  resize () {
    this.resolution = [
      this.sizes.width * this.sizes.pixelRatio,
      this.sizes.height * this.sizes.pixelRatio
    ]
    this.frontMaterial.uniforms.uResolution.value = this.resolution
  }

  hide () {
    this.inFrame = false
    const { width: windowWidth } = getSizeAtZ(0, this.camera.camera, this.sizes)
    forEach([this.romane, this.chouteau], (word, i) => {
      gsap.to([...map(reverse([...word]), letter => letter.position)], {
        duration: 0.7,
        x: index => reverse([...this.letterPositions[i]])[index] + windowWidth,
        stagger: 0.02,
        ease: 'power3.inOut'
      })
    })
  }

  show () {
    forEach([this.romane, this.chouteau], (word, i) => {
      gsap.to([...map(word, letter => letter.position)], {
        duration: 0.7,
        x: index => this.letterPositions[i][index],
        stagger: 0.05,
        ease: 'power3.inOut'
      })
    })
    this.inFrame = true
  }
}

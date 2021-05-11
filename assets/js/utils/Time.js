// Stolen from https://github.com/brunosimon/folio-2019
import EventEmitter from './EventEmitter'

export default class Time extends EventEmitter {
  constructor () {
    super()

    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16

    this.tick = this.tick.bind(this)
    this.tick()
  }

  tick () {
    setTimeout(() => {
      this.ticker = window.requestAnimationFrame(this.tick)
      this.trigger('tick')
    }, 1000 / 60)

    const current = Date.now()

    this.delta = current - this.current
    this.elapsed = current - this.start
    this.current = current

    if (this.delta > 60) {
      this.delta = 60
    }

    this.trigger('tick')
  }

  stop () {
    if (this.ticker) { window.cancelAnimationFrame(this.ticker) }
  }
}

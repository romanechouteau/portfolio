// Stolen from https://github.com/brunosimon/folio-2019

export default class {
  constructor () {
    this.callbacks = {}
    this.callbacks.base = {}
  }

  on (_names, callback) {
    const _this = this

    if (typeof _names === 'undefined' || _names === '') {
      return false
    }

    if (typeof callback === 'undefined') {
      return false
    }

    const names = this.resolveNames(_names)

    names.forEach(function (_name) {
      const name = _this.resolveName(_name)
      if (!(_this.callbacks[name.namespace] instanceof Object)) {
        _this.callbacks[name.namespace] = {}
      }
      if (!(_this.callbacks[name.namespace][name.value] instanceof Array)) {
        _this.callbacks[name.namespace][name.value] = []
      }
      _this.callbacks[name.namespace][name.value].push(callback)
    })
    return this
  }

  off (_names) {
    const _this = this

    if (typeof _names === 'undefined' || _names === '') {
      return false
    }

    const names = this.resolveNames(_names)

    names.forEach(function (_name) {
      const name = _this.resolveName(_name)

      if (name.namespace !== 'base' && name.value === '') {
        delete _this.callbacks[name.namespace]
      } else if (name.namespace === 'base') {
        for (const namespace in _this.callbacks) {
          if (
            _this.callbacks[namespace] instanceof Object &&
                _this.callbacks[namespace][name.value] instanceof Array
          ) {
            delete _this.callbacks[namespace][name.value]

            if (Object.keys(_this.callbacks[namespace]).length === 0) {
              delete _this.callbacks[namespace]
            }
          }
        }
      } else if (
        _this.callbacks[name.namespace] instanceof Object &&
            _this.callbacks[name.namespace][name.value] instanceof Array
      ) {
        delete _this.callbacks[name.namespace][name.value]

        if (Object.keys(_this.callbacks[name.namespace]).length === 0) {
          delete _this.callbacks[name.namespace]
        }
      }
    })
    return this
  }

  trigger (_name, _args) {
    const _this = this

    if (typeof _name === 'undefined' || _name === '') {
      return false
    }
    let finalResult = null
    let result = null
    const args = !(_args instanceof Array) ? [] : _args
    let name = this.resolveNames(_name)
    name = this.resolveName(name[0])

    if (name.namespace === 'base') {
      for (const namespace in _this.callbacks) {
        if (
          _this.callbacks[namespace] instanceof Object &&
            _this.callbacks[namespace][name.value] instanceof Array
        ) {
          _this.callbacks[namespace][name.value].forEach(function (callback) {
            result = callback.apply(_this, args)
            if (typeof finalResult === 'undefined') {
              finalResult = result
            }
          })
        }
      }
    } else if (this.callbacks[name.namespace] instanceof Object) {
      if (name.value === '') {
        return this
      }
      _this.callbacks[name.namespace][name.value].forEach(function (callback) {
        result = callback.apply(_this, args)
        if (typeof finalResult === 'undefined') {
          finalResult = result
        }
      })
    }
    return finalResult
  }

  resolveNames (_names) {
    let names = _names
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '')
    names = names.replace(/[,/]+/g, ' ')
    names = names.split(' ')
    return names
  }

  resolveName (name) {
    const newName = {}
    const parts = name.split('.')
    newName.original = name
    newName.value = parts[0]
    newName.namespace = 'base'
    if (parts.length > 1 && parts[1] !== '') {
      newName.namespace = parts[1]
    }
    return newName
  }
}

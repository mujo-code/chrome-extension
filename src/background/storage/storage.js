import { from, noop } from '../../lib/functional'

export class Storage {
  constructor({ version, model, storageInterface = {} }) {
    const { getters, setters } = storageInterface

    this.getters = getters
    this.setters = setters
    this.version = version
    this.model = model
  }

  async get(key) {
    const typeFN = (this.model[key] && this.model[key].type) || noop
    const type = typeof typeFN()
    if (type === 'undefined') {
      throw new TypeError(`No key "${key}" found in typed model`)
    }
    return this.getters[type](key)
  }

  async set(key, value) {
    const typeFN = (this.model[key] && this.model[key].type) || noop
    const type = typeof typeFN()
    if (type === 'undefined') {
      throw new TypeError(`No key "${key}" found in typed model`)
    }
    return this.setters[type](key, value)
  }
}

Storage.from = from(Storage)

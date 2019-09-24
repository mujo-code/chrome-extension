import { compose } from '../../lib/functional'
import { set } from '../../lib/util'
import { types, serializers, deserializers } from './types'

export default {
  getters: types.reduce((accum, type) => {
    set(
      accum,
      type,
      compose(
        deserializers[type],
        localStorage.getItem.bind(localStorage)
      )
    )
    return accum
  }, {}),
  setters: types.reduce((accum, type) => {
    set(accum, type, (key, value) => {
      localStorage.setItem(key, serializers[type](value))
    })
    return accum
  }, {}),
}

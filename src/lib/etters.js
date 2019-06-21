import { curry } from './functional'

export const set = curry((obj, key, value) => {
  Object.assign(obj, { [key]: value })
})

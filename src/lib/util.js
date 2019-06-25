import { curry } from './functional'

export const set = curry((obj, key, value) => {
  Object.assign(obj, { [key]: value })
})

export const create = curry((obj, key, value) =>
  Object.assign({}, obj, { [key]: value })
)

export const toString = x => `${x}`

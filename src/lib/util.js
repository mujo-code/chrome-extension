import { curry } from './functional'

export const set = curry((obj, key, value) => {
  Object.defineProperty(obj, key, {
    value,
    writable: true,
    enumerable: true,
  })
})

export const create = curry((obj, key, value) => ({
  ...obj,
  [key]: value,
}))

export const toString = x => `${x}`
export const toLowerCase = x => String.prototype.toLowerCase.call(x)
export const toDashCase = x =>
  toString(x)
    .split(/_|\s/gi)
    .map(toLowerCase)
    .join('-')

import { set } from './util'

// chrome passes results as first object
export const promisify = fn => (...args) =>
  new Promise(resolve => {
    fn(...args, resolve)
  })

export const promisifyObject = (obj = {}) =>
  Object.keys(obj).reduce((accum, method) => {
    if (typeof obj[method] === 'function') {
      set(accum, method, promisify(obj[method].bind(obj)))
    }
    return accum
  }, {})

// node pattern is usually error first then results
export const promisifyNode = fn => (...args) =>
  new Promise((resolve, reject) => {
    fn(...args, (err, results) => {
      if (err) return reject(err)
      return resolve(results)
    }) // chrome passes results as first object
  })

export const promisifyOptions = (fn, options) =>
  new Promise((resolve, reject) => {
    fn({ ...options, success: resolve, failure: reject })
  })

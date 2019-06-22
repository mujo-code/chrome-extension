import { curry, first } from './functional'

export const find = curry((query, arr) => {
  const keys = Object.keys(query)
  return first(
    arr.filter(item => keys.every(key => item[key] === query[key]))
  )
})

import { useState } from 'react'

const idt = x => x

export const usePersistantState = (key, options = {}) => {
  const { defaultValue, deserialize = idt, serialize = idt } = options
  const storeValue = deserialize(localStorage.getItem(key))
  // TODO: not sure I should be doing this ||
  const [value, setState] = useState(
    storeValue === null ? defaultValue : storeValue
  )
  const updatePersistantState = (val, opts = {}) => {
    const { onlyMemory, refresh } = opts
    if (refresh) {
      const storeVal = deserialize(localStorage.getItem(key))
      setState(storeVal)
      return
    }
    if (!onlyMemory) {
      localStorage.setItem(key, serialize(val))
    }
    setState(val)
  }

  return [value, updatePersistantState]
}

export const stampBooleanOptions = options =>
  Object.assign(
    {},
    { deserialize: n => n === 'true', serialize: n => `${n}` },
    options
  )

export const stampJSONOptions = options =>
  Object.assign(
    {},
    {
      deserialize: n => {
        let ret
        try {
          ret = JSON.parse(n)
        } catch (e) {
          ret = null
        }
        return ret
      },
      serialize: n => JSON.stringify(n),
    },
    options
  )

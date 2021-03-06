import { Extension } from '@mujo/utils'
import { useState, useEffect, useCallback } from 'react'
import model from '../model'

const { getStorage, setStorage } = Extension
export const useStorage = key => {
  if (typeof model[key] === 'undefined') {
    throw new TypeError(`No key "${key}" found in model file`)
  }

  const descriptor = model[key]
  const { defaultValue, type } = descriptor
  const [value, setState] = useState(defaultValue)
  const [pending, setPending] = useState(true)

  const updateFromStore = useCallback(async () => {
    const storageValue = await getStorage(key)
    const isUndefined = typeof storageValue === 'undefined'
    const isNull = storageValue === null
    if (isNull || isUndefined) {
      return
    }
    setState(storageValue)
  }, [key])

  const updatePersistantState = (val, opts = {}) => {
    const { onlyMemory, refresh } = opts
    if (refresh) {
      // get value and store
      updateFromStore()
      return
    }
    if (typeof val !== typeof type()) {
      console.error(
        new TypeError(
          `
        Attempted to set value of "${key}" with incorrect type.
        Expected "${typeof type()}" but got "${typeof val}"
        `.trim()
        )
      )
      return
    }
    if (!onlyMemory) {
      // set value
      setStorage(key, val)
    }
    setState(val)
  }

  useEffect(() => {
    const initialize = async () => {
      await updateFromStore()
      setPending(false)
    }
    initialize()
  }, [updateFromStore])

  return [value, updatePersistantState, { pending }]
}

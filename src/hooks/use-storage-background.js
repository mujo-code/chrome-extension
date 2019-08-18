import { useState, useEffect, useCallback } from 'react'
import { storage, changeEmitter } from '../background/storage'
import model from '../model'

export const useStorage = (key, defaultArg) => {
  const modelDefault = model[key] && model[key].defaultValue
  const hasNoDefault = typeof modelDefault === 'undefined'
  const defaultValue = hasNoDefault ? defaultArg : modelDefault
  const [value, set] = useState(defaultValue)
  const [initialized, setInitialized] = useState(false)

  const getValue = useCallback(async () => {
    const newValue = await storage.get(key)
    set(newValue)
  }, [key, set])

  useEffect(() => {
    if (!initialized) {
      // get initial value
      getValue()
      setInitialized(true)
    }
  }, [getValue, initialized, key, set, value])

  useEffect(() => {
    const callback = newValue => {
      set(newValue)
    }
    changeEmitter.on(key, callback)
    return () => changeEmitter.off(key, callback)
  }, [key, set])

  return [value, set]
}

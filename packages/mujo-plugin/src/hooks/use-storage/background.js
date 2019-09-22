import { useState, useEffect, useCallback, useContext } from 'react'
import { context } from '../../components/plugin-provider'

export const useStorageBackground = (key, defaultArg) => {
  const { model, changeEmitter, storage } = useContext(context)
  const modelDefault = model[key] && model[key].defaultValue
  const hasNoDefault = typeof modelDefault === 'undefined'
  const defaultValue = hasNoDefault ? defaultArg : modelDefault
  const [value, set] = useState(defaultValue)
  const [initialized, setInitialized] = useState(false)

  const getValue = useCallback(async () => {
    const newValue = await storage.get(key)
    set(newValue)
  }, [key, set, storage])

  const setValue = useCallback(
    async newValue => {
      set(newValue)
      await storage.set(key, newValue)
    },
    [key, set, storage]
  )

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
  }, [key, set, changeEmitter])

  return [value, setValue]
}

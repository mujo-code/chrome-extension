import { useState, useEffect, useCallback, useContext } from 'react'
import { context } from '../../components/plugin-provider'

export const useStorageClient = (key, defaultArg) => {
  const { model, extension, constants } = useContext(context)
  const descriptor = model[key] || {}
  const { defaultValue = defaultArg, type } = descriptor
  const [value, setState] = useState(defaultValue)
  const [pending, setPending] = useState(true)

  const updateFromStore = useCallback(async () => {
    const storageValue = await extension.getStorage(key)
    const isUndefined = typeof storageValue === 'undefined'
    const isNull = storageValue === null
    if (isNull || isUndefined) {
      return
    }
    setState(storageValue)
  }, [key, extension])

  const updatePersistantState = useCallback(
    (val, opts = {}) => {
      const { onlyMemory, refresh } = opts
      if (refresh) {
        // get value and store
        updateFromStore()
        return
      }
      if (type && typeof val !== typeof type()) {
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
        extension.setStorage(key, val)
      }
      setState(val)
    },
    [setState, extension, key, type, updateFromStore]
  )

  const changeListener = useCallback(
    payload => {
      const { key: eventKey, event } = payload
      if (event !== constants.VALUE_CHANGED || eventKey !== key) return
      updatePersistantState(null, { refresh: true })
    },
    [updatePersistantState, constants, key]
  )

  useEffect(() => {
    const initialize = async () => {
      await updateFromStore()
      setPending(false)
    }
    initialize()
  }, [updateFromStore])

  useEffect(() => {
    extension.runtime.onMessage.addListener(changeListener)
    return () => extension.runtime.onMessage.removeListener(changeListener)
  }, [key, extension, changeListener])

  return [value, updatePersistantState, { pending }]
}

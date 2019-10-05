import { useEffect, useCallback, useContext } from 'react'
import { context } from '../components/plugin-provider'

export const useMessage = (fn, dependencies = []) => {
  const { messageEmitter, constants } = useContext(context)
  const { MESSAGE } = constants
  const onMessage = useCallback((...args) => fn(...args), [fn, ...dependencies])
  useEffect(() => {
    messageEmitter.on(MESSAGE, onMessage)
    return () => messageEmitter.off(MESSAGE, onMessage)
  }, [onMessage, messageEmitter, MESSAGE])
}

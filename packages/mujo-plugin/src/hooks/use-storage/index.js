import { useContext } from 'react'
import { useStorageBackground } from './background'
import { useStorageClient } from './client'

export const useStorage = (...args) => {
  const { env } = useContext(context)
  // NOTE: conditional hook, but should not switch on renders since environment
  // should not change on renders
  const useHook = env === 'background' ? useStorageBackground : useStorageClient
  return useHook(...args)
}

import { Extension } from '@mujo/utils'
import { useState, useEffect, useCallback } from 'react'

const { permissions } = Extension

export const usePermissions = perms => {
  const [hasPermission, setHasPermission] = useState(false)

  const requestPermissions = useCallback(async () => {
    if (hasPermission) return // no use asking for permissions we already have
    const granted = await permissions.request(perms)
    if (granted) {
      setHasPermission(granted)
    }
  }, [hasPermission, perms])

  const removePermissions = useCallback(async () => {
    if (!hasPermission) return // no use asking for permissions we already have
    const removed = await permissions.remove(perms)
    if (removed) {
      setHasPermission(false)
    }
  }, [hasPermission, perms])

  useEffect(() => {
    const check = async () => {
      const granted = await permissions.contains(perms)
      if (hasPermission !== granted) {
        setHasPermission(granted)
      }
    }
    check()
  }, [hasPermission, perms, setHasPermission])

  return {
    hasPermission,
    requestPermissions,
    removePermissions,
  }
}

import { useEffect, useCallback } from 'react'
import { isActive } from '../background/activity'
import { alarms } from '../background/alarm'
import { HEARTBEAT } from '../constants'

export const useHeartBeat = fn => {
  const onHeartBeat = useCallback(async () => {
    const active = await isActive()
    fn(active)
  }, [fn])
  useEffect(() => {
    alarms.on(HEARTBEAT, onHeartBeat)
    return () => alarms.off(HEARTBEAT, onHeartBeat)
  }, [onHeartBeat])
}

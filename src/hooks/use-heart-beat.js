import { useEffect } from 'react'
import { alarms } from '../background/alarm'
import { HEARTBEAT } from '../constants'

export const useHeartBeat = fn => {
  useEffect(() => {
    alarms.on(HEARTBEAT, fn)
    return () => alarms.off(HEARTBEAT, fn)
  }, [fn])
}

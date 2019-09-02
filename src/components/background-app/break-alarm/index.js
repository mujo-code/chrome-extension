import { useEffect, useCallback } from 'react'
import { upsertAlarm } from '../../../background/alarm/util'
import {
  ALARM_KEY,
  THREE_HOURS,
  PREDICTED_BREAK_TIMES_FEATURE,
} from '../../../constants'
import { useHeartBeat } from '../../../hooks/use-heart-beat'
import { useStorage } from '../../../hooks/use-storage-background'
import { alarms } from '../../../lib/extension'
import { msToMinutes } from '../../../lib/time'

export const BreakAlarm = () => {
  const [isEnabled] = useStorage(ALARM_KEY)

  // callbacks
  const addBreakAlarm = useCallback(() => {
    if (PREDICTED_BREAK_TIMES_FEATURE) return
    const delayInMinutes = msToMinutes(THREE_HOURS)
    upsertAlarm(ALARM_KEY, { delayInMinutes })
  }, [])
  const removeBreakAlarm = useCallback(() => {
    alarms.clear(ALARM_KEY)
  }, [])
  const handleAlarmToggle = useCallback(
    enabled => {
      if (enabled) {
        addBreakAlarm()
      } else {
        removeBreakAlarm()
      }
    },
    [addBreakAlarm, removeBreakAlarm]
  )

  // effects
  useEffect(() => {
    handleAlarmToggle(isEnabled)
  }, [handleAlarmToggle, isEnabled])
  useHeartBeat(isActive => {
    handleAlarmToggle(isEnabled && isActive)
  })
  return null
}

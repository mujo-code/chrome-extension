import React, { useEffect, useCallback } from 'react'
import { upsertAlarm } from '../../../background/alarm/util'
import { ALARM_KEY, THREE_HOURS } from '../../../constants'
import { useHeartBeat } from '../../../hooks/use-heart-beat'
import { useStorage } from '../../../hooks/use-storage-background'
import { alarms } from '../../../lib/extension'
import { msToMinutes } from '../../../lib/time'

export const BreakAlarm = () => {
  const [isEnabled] = useStorage(ALARM_KEY)

  // callbacks
  const addBreakAlarm = useCallback(() => {
    const delayInMinutes = msToMinutes(THREE_HOURS)
    return upsertAlarm(ALARM_KEY, { delayInMinutes })
  }, [])
  const removeBreakAlarm = useCallback(() => {
    alarms.clear(ALARM_KEY)
  }, [])
  const handleAlarmToggle = useCallback(() => {
    if (isEnabled) {
      addBreakAlarm()
    } else {
      removeBreakAlarm()
    }
  }, [addBreakAlarm, isEnabled, removeBreakAlarm])

  // effects
  useEffect(() => {
    handleAlarmToggle(isEnabled)
  }, [handleAlarmToggle, isEnabled])
  useHeartBeat(() => {
    handleAlarmToggle(isEnabled)
  })
  return <></>
}

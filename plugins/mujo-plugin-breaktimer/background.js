import { useHeartBeat, useStorage, context } from '@mujo/plugins'
import { useEffect, useCallback, useContext } from 'react'

// TODO: dont dupe code soo much
const ALARM_KEY = 'MINDFUL_ALARM'
const PREDICTED_BREAK_TIMES_FEATURE = 'PREDICTED_BREAK_TIMES_FEATURE'
const HOUR_HALF = 1000 * 60 * 60 * 1.5
const factor = (units, conv) => Math.floor(units / conv)
const msToMinutes = ms => factor(factor(ms, 1000), 60)

export const BreakAlarmBackground = () => {
  const { extension } = useContext(context)
  const [isEnabled] = useStorage(ALARM_KEY)
  const addBreakAlarm = useCallback(() => {
    if (PREDICTED_BREAK_TIMES_FEATURE) return
    const delayInMinutes = msToMinutes(HOUR_HALF)
    extension.alarms.upsertAlarm(ALARM_KEY, { delayInMinutes })
  }, [extension])
  const removeBreakAlarm = useCallback(() => {
    extension.alarms.clear(ALARM_KEY)
  }, [extension])
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

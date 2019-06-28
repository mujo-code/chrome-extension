import { ALARM_KEY, THREE_HOURS } from '../../constants'
import { alarms } from '../../lib/extension'
import { msToMinutes } from '../../lib/time'
import { upsertAlarm } from './util'

export const removeBreakAlarm = () => {
  alarms.clear(ALARM_KEY)
}

export const addBreakAlarm = async () => {
  const delayInMinutes = msToMinutes(THREE_HOURS)
  return upsertAlarm(ALARM_KEY, { delayInMinutes })
}

export const handleAlarmToggle = enabled => {
  if (enabled) {
    addBreakAlarm()
  } else {
    removeBreakAlarm()
  }
}

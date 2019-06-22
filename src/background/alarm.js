import { ALARM_KEY, THREE_HOURS } from '../constants'
import { alarms } from '../lib/extension'

let ACTIVITY_TIMER = null
export const clearAlarm = () => {
  alarms.clear(ALARM_KEY)
}

export const setAlarm = () => {
  alarms.get(ALARM_KEY, alarm => {
    if (!alarm) {
      const when = +Date.now() + THREE_HOURS
      alarms.create(ALARM_KEY, { when })
    }
  })
}

// Setting User Activity
export const setActivityTimeout = () => {
  setAlarm()
  ACTIVITY_TIMER = setTimeout(() => {
    clearAlarm()
  })
}

export const clearActivityTimeout = () => {
  clearTimeout(ACTIVITY_TIMER)
}

export const updateUserActivity = () => {
  clearActivityTimeout()
  setActivityTimeout()
}

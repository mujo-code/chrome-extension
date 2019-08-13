import {
  ALARM_KEY,
  HEARTBEAT,
  PREDICTED_BREAK_TIMES_FEATURE,
} from '../../constants'
import { createNotification } from '../notifications'
import { onHeartBeat, addHeartBeat } from './heartbeat'
import { checkPredictions } from './prediction'

export {
  addBreakAlarm,
  removeBreakAlarm,
  handleAlarmToggle,
} from './break-alarm'

export const initAlarms = async (...args) => {
  checkPredictions({ isActive: PREDICTED_BREAK_TIMES_FEATURE })
  addHeartBeat()
}

export const alarmReducer = alarm => {
  switch (alarm.name) {
    case HEARTBEAT:
      onHeartBeat(alarm)
      break
    case ALARM_KEY:
    default:
      // NOTE: this is because we the date as the alarm
      // TODO: add a name into the api
      createNotification(alarm)
      break
  }
}

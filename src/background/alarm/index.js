import { ALARM_KEY, HEARTBEAT } from '../../constants'
import { createNotification } from '../notifications'
import { onHeartBeat } from './heartbeat'

export { addHeartBeat } from './heartbeat'
export {
  addBreakAlarm,
  removeBreakAlarm,
  handleAlarmToggle,
} from './break-alarm'

export const alarmReducer = alarm => {
  switch (alarm.name) {
    case HEARTBEAT:
      onHeartBeat(alarm)
      break
    case ALARM_KEY:
      createNotification(alarm)
      break
    default:
  }
}

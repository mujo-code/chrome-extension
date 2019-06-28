import { HEARTBEAT, FOURTY_FIVE_MINUTES } from '../../constants'
import { msToMinutes } from '../../lib/time'
import { isActive, resetUsage } from '../activity'
import { addBreakAlarm, removeBreakAlarm } from './break-alarm'
import { upsertAlarm } from './util'

export const onHeartBeat = async () => {
  const active = await isActive()
  if (active) {
    await addBreakAlarm()
  } else {
    removeBreakAlarm()
    await resetUsage()
  }
}

export const addHeartBeat = () => {
  const periodInMinutes = msToMinutes(FOURTY_FIVE_MINUTES)
  return upsertAlarm(HEARTBEAT, { periodInMinutes })
}

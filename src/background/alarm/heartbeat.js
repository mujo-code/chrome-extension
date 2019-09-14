import { HEARTBEAT, FOURTY_FIVE_MINUTES } from '../../constants'
import { alarms } from '../../lib/extension'
import { msToMinutes } from '../../lib/time'
import { isActive, resetUsage } from '../activity'
import { checkPredictions } from './prediction'

export const onHeartBeat = async () => {
  const active = await isActive()
  if (active) {
    await checkPredictions()
  } else {
    await resetUsage()
  }
}

export const addHeartBeat = () => {
  const periodInMinutes = msToMinutes(FOURTY_FIVE_MINUTES)
  return alarms.upsertAlarm(HEARTBEAT, { periodInMinutes })
}

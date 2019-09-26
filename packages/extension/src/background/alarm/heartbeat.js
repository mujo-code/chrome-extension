import { Extension, Time } from '@mujo/utils'
import { HEARTBEAT, FOURTY_FIVE_MINUTES } from '../../constants'
import { isActive, resetUsage } from '../activity'

const { alarms } = Extension
const { msToMinutes } = Time

export const onHeartBeat = async () => {
  const active = await isActive()
  if (!active) {
    await resetUsage()
  }
}

export const addHeartBeat = () => {
  const periodInMinutes = msToMinutes(FOURTY_FIVE_MINUTES)
  return alarms.upsertAlarm(HEARTBEAT, { periodInMinutes })
}

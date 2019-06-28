import { alarms } from '../../lib/extension'

export const getAlarm = key =>
  new Promise(resolve => {
    alarms.get(key, alarm => {
      resolve(alarm)
    })
  })

export const upsertAlarm = async (key, ...args) => {
  const alarm = await getAlarm(key)
  if (alarm) return
  alarms.create(key, ...args)
}

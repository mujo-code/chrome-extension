import { ALARM_KEY } from '../constants'
import { notifications, tabs } from '../lib/extension'
import { storage } from './storage'
import { track } from './tracking'

export const createNotification = async () => {
  const isEnabled = await storage.get(ALARM_KEY)

  if (!isEnabled) return
  // TODO: pass some information here to make this more contextual
  const title = 'Take a break'
  const options = {
    type: 'basic',
    title,
    message: 'Gentle nudge to be mindful with your time.',
    iconUrl: 'favicon.png',
  }
  const id = notifications.create(options, () => {})
  track({
    category: 'notification',
    action: 'sent',
    label: id,
    value: title,
  })
}

export const onNotificationClicked = id => {
  const url = 'chrome://newtab?play=true'
  notifications.clear(id)
  tabs.create({ url })
  track({
    category: 'notification',
    action: 'clicked',
    label: id,
  })
}

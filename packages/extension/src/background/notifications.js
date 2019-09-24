import { ALARM_KEY } from '../constants'
import { i18n } from '../i18n'
import { notifications, tabs } from '../lib/extension'
import { storage } from './storage'
import { track } from './tracking'

export const createNotification = async () => {
  const isEnabled = await storage.get(ALARM_KEY)

  if (!isEnabled) return
  // TODO: pass some information here to make this more contextual
  const title = i18n.t('take-a-break')
  const options = {
    type: 'basic',
    title,
    message: i18n.t('gentle-nudge'),
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

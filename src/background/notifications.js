import { notifications, tabs } from '../lib/extension'

export const createNotification = () => {
  // TODO: pass some information here to make this more contextual
  const options = {
    type: 'basic',
    title: 'Take a break',
    message: 'Gentle nudge to be mindful with your time.',
    iconUrl: 'favicon.png',
  }
  notifications.create(options, () => {})
}

export const onNotificationClicked = event => {
  const url = 'chrome://newtab?play=true'
  notifications.clear(event)
  tabs.create({ url })
}

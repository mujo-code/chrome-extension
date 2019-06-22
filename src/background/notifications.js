export const createNotification = () => {
  // TODO: pass some information here to make this more contextual
  const options = {
    type: 'basic',
    title: 'Take a break',
    message: 'Gentle nudge to be mindful with your time.',
    iconUrl: 'favicon.png',
  }
  chrome.notifications.create(options, () => {})
}

export const onNotificationClicked = event => {
  const url = 'chrome://newtab'
  chrome.notifications.clear(event)
  chrome.tabs.create({ url })
}

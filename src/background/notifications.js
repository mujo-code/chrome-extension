export const createNotification = () => {
  const options = {
    type: 'basic',
    title: 'Take a break!',
    message: 'Gentle Reminder to take some time to be mindful',
    iconUrl: 'favicon.png',
    buttons: [
      { title: 'Take a break' },
      { title: 'Turn off reminders' },
    ],
  }
  chrome.notifications.create(options, () => {})
}

export const onNotificationClicked = event => {
  const url = 'https://padyogi.com/session/random'
  chrome.notifications.clear(event)
  chrome.tabs.create({ url })
}

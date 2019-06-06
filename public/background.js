/* global chrome */
const ALARM = 'MINDFUL_ALARM'
const THREE_HOURS = 1000 * 60 * 60 * 3
let ACTIVITY_TIMER = null

// ACTIONS
const NEW_TAB_CONNECTION = 'New Connection'
const CLEAR_ALARM = 'Clear Alarm'
const SET_ALARM = 'Set Alarm'

// Toggling Alarm
const clearAlarm = () => {
  chrome.alarms.clear(ALARM)
}

const setAlarm = () => {
  chrome.alarms.get(ALARM, alarm => {
    if (!alarm) {
      console.log('Create Alarm')
      chrome.alarms.create(ALARM, { when: +Date.now() + THREE_HOURS })
    }
  })
}

// Setting User Activity
const setActivityTimeout = () => {
  setAlarm()
  ACTIVITY_TIMER = setTimeout(() => {
    clearAlarm()
  })
}

const clearActivityTimeout = () => {
  clearTimeout(ACTIVITY_TIMER)
}

const updateUserActivity = () => {
  clearActivityTimeout()
  setActivityTimeout()
}

chrome.notifications.onClicked.addListener(event => {
  const url = 'https://padyogi.com/session/random'
  chrome.notifications.clear(event)
  chrome.tabs.create({ url })
})

chrome.alarms.onAlarm.addListener(() => {
  const options = {
    type: 'basic',
    title: 'Take a break!',
    message: 'Gentle Reminder to take some time to be mindful',
    iconUrl: 'favicon.png',
    buttons: [{ title: 'Take a break' }, { title: 'Turn off reminders' }],
  }
  chrome.notifications.create(options, () => {})
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const isNewTab = sender.tab.url === 'chrome://newtab/'
  if (isNewTab) {
    sendResponse({ success: true })
    const { event } = request
    console.log(`Event recieved: "${event || 'no event'}"`)
    switch (event) {
      case NEW_TAB_CONNECTION:
      case SET_ALARM:
        updateUserActivity()
        break
      case CLEAR_ALARM:
        clearAlarm()
        clearActivityTimeout()
        break
      default:
        console.log(`Error: unknown event "${event || 'no event'}"`)
    }
  }
})

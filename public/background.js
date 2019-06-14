/* global chrome */
const ALARM = 'MINDFUL_ALARM'
const SITE_TIME_KEY = 'SITE_TIME'
const THREE_HOURS = 1000 * 60 * 60 * 3
let ACTIVITY_TIMER = null

// ACTIONS
const NEW_TAB_CONNECTION = 'New Connection'
const CLEAR_ALARM = 'Clear Alarm'
const SET_ALARM = 'Set Alarm'
const PAGE_VIEWING_TIME = 'Page Viewing Time'

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

const getOrigin = url => new URL(url).origin

const updateViewTime = (url, measures) => {
  const site = getOrigin(url)
  const siteTimes =
    JSON.parse(localStorage.getItem(SITE_TIME_KEY)) || {}
  const totalTime = measures.reduce((total, m) => {
    /* eslint-disable-next-line */
    total += m.duration
    return total
  }, 0)
  const currentSiteTime = (siteTimes[site] || 0) + totalTime
  const nextSiteTimes = Object.assign({}, siteTimes, {[site]: currentSiteTime,})
  localStorage.setItem(SITE_TIME_KEY, JSON.stringify(nextSiteTimes))
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
    buttons: [
      { title: 'Take a break' },
      { title: 'Turn off reminders' },
    ],
  }
  chrome.notifications.create(options, () => {})
})

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    const isNewTab = sender.tab.url === 'chrome://newtab/'
    if (isNewTab) {
      const { event } = request
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
      }
    } else {
      const { event } = request
      switch (event) {
        case PAGE_VIEWING_TIME:
          updateViewTime(sender.url, request.measure)
          break
        default:
      }
      sendResponse({ success: true })
    }
  }
)

const BLACK_LIST = ['about:blank', 'chrome']

chrome.webNavigation.onCommitted.addListener(tab => {
  const isBlackListed = BLACK_LIST.some(url =>
    tab.url.startsWith(url)
  )
  const isSubFrame = tab.transitionType === '"auto_subframe"'
  if (isBlackListed || isSubFrame) {
    return
  }
  chrome.tabs.executeScript(tab.tabId, { file: 'site-time.js' })
})

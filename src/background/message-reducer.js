import {
  NEW_TAB_CONNECTION,
  CLEAR_ALARM,
  SET_ALARM,
  PAGE_VIEWING_TIME,
} from '../constants'
import {
  updateUserActivity,
  clearAlarm,
  clearActivityTimeout,
} from './alarm'
import { updateScreenTime } from './screen-time'

export const reducer = (request, sender, sendResponse) => {
  const isNewTab = sender.tab.url === 'chrome://newtab/'
  const { event } = request
  if (isNewTab) {
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
    switch (event) {
      case PAGE_VIEWING_TIME:
        updateScreenTime(sender.url, request.measure)
        break
      default:
    }
  }
  sendResponse({ success: true })
}

import {
  NEW_TAB_CONNECTION,
  PAGE_VIEWING_TIME,
  GET_STORAGE,
  SET_STORAGE,
  RESET_USAGE,
  DEEP_LINK_NEWTAB,
  ALARM_KEY,
  TRACK,
  ADD_BROADCAST_TAB,
  REMOVE_BROADCAST_TAB,
} from '../constants'
import { tabs } from '../lib/extension'
import {
  setLastActive,
  resetUsage,
  activityStatKeys,
  updateActivityNumber,
} from './activity'
import { handleAlarmToggle, addBreakAlarm } from './alarm'
import { updateScreenTime } from './screen-time'
import { onGetStorage, onSetStorage } from './storage'
import { broadcaster } from './storage/broadcast'
import { addData } from './tracking'

export const reducer = (request, sender, sendResponse) => {
  const { event } = request
  let hasResponse = false
  switch (event) {
    case ADD_BROADCAST_TAB:
      broadcaster.add(sender.tab)
      break
    case REMOVE_BROADCAST_TAB:
      broadcaster.remove(sender.tab)
      break
    case NEW_TAB_CONNECTION:
      addData({ event: 'pageView' }) // custom event for pageviews
      addBreakAlarm()
      break
    case PAGE_VIEWING_TIME:
      updateScreenTime(sender.url, request.measure)
      updateActivityNumber()
      break
    case GET_STORAGE:
      hasResponse = true
      onGetStorage(request.key, sendResponse)
      break
    case SET_STORAGE:
      hasResponse = true
      onSetStorage(request.key, request.value, sendResponse)
      // toggle break alarms
      if (request.key === ALARM_KEY) {
        handleAlarmToggle(request.value)
      }
      if (activityStatKeys.indexOf(request.key) !== -1) {
        updateActivityNumber()
      }
      break
    case RESET_USAGE:
      resetUsage()
      break
    case DEEP_LINK_NEWTAB: {
      const { url, tab } = sender
      tabs.update(tab.id, { url: `chrome://newtab?site=${url}` })
      break
    }
    case TRACK:
      addData(request.payload || {})
      break
    default:
  }
  if (!hasResponse) {
    sendResponse({ success: true })
  }
  // set last active time to indicate user is currently active
  setLastActive()
  return true // must return true if there is a reponse
}

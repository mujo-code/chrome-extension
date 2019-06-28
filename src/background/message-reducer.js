import {
  NEW_TAB_CONNECTION,
  PAGE_VIEWING_TIME,
  GET_STORAGE,
  SET_STORAGE,
  RESET_USAGE,
  DEEP_LINK_NEWTAB,
  ALARM_KEY,
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

export const reducer = (request, sender, sendResponse) => {
  const { event } = request
  switch (event) {
    case NEW_TAB_CONNECTION:
      addBreakAlarm()
      break
    case PAGE_VIEWING_TIME:
      updateScreenTime(sender.url, request.measure)
      updateActivityNumber()
      break
    case GET_STORAGE:
      onGetStorage(request.key, sendResponse)
      break
    case SET_STORAGE:
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
    default:
  }
  // set last active time to indicate user is currently active
  setLastActive()
}

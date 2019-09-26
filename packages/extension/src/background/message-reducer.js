import { Extension } from '@mujo/utils'
import EventEmitter from 'eventemitter3'
import {
  NEW_TAB_CONNECTION,
  PAGE_VIEWING_TIME,
  GET_STORAGE,
  SET_STORAGE,
  RESET_USAGE,
  DEEP_LINK_NEWTAB,
  TRACK,
  ADD_BROADCAST_TAB,
  REMOVE_BROADCAST_TAB,
  MESSAGE,
} from '../constants'
import {
  setLastActive,
  resetUsage,
  activityStatKeys,
  updateActivityNumber,
} from './activity'
import { onGetStorage, onSetStorage } from './storage'
import { broadcaster } from './storage/broadcast'
import { track } from './tracking'

const { tabs } = Extension

export const messageEmitter = new EventEmitter()

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
      track({ event: 'pageView' }) // custom event for pageviews
      break
    case PAGE_VIEWING_TIME:
      updateActivityNumber()
      break
    case GET_STORAGE:
      hasResponse = true
      onGetStorage(request.key, sendResponse)
      break
    case SET_STORAGE:
      hasResponse = true
      onSetStorage(request.key, request.value, sendResponse)
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
      track(request.payload)
      break
    default:
  }
  messageEmitter.emit(MESSAGE, {
    request,
    sender,
    sendResponse: (...args) => {
      if (!hasResponse) {
        hasResponse = true
        sendResponse(...args)
      } else {
        console.warn(
          `A response has already been sent for "${event}"`
        )
      }
    },
  })
  if (!hasResponse) {
    sendResponse({ success: true })
  }
  // set last active time to indicate user is currently active
  setLastActive()
  return true // must return true if there is a reponse
}

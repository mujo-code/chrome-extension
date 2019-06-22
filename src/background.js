import { injectScript } from './background/inject'
import { reducer } from './background/message-reducer'
import {
  createNotification,
  onNotificationClicked,
} from './background/notifications'
import {
  onMessage,
  alarms,
  webNavigation,
  notifications,
} from './lib/extension'

notifications.onClicked.addListener(onNotificationClicked)
alarms.onAlarm.addListener(createNotification)
// NOTE: Most functionlity will probably stem from the reducer
onMessage.addListener(reducer)
webNavigation.onCommitted.addListener(injectScript)

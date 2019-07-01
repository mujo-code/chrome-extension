import { alarmReducer, addHeartBeat } from './background/alarm'
import { injectScript } from './background/inject'
import { reducer } from './background/message-reducer'
import { onNotificationClicked } from './background/notifications'
import { injectTracking } from './background/tracking'
import {
  onMessage,
  alarms,
  webNavigation,
  notifications,
} from './lib/extension'

notifications.onClicked.addListener(onNotificationClicked)
alarms.onAlarm.addListener(alarmReducer)
// NOTE: Most functionlity will probably stem from the reducer
onMessage(reducer)
webNavigation.onCommitted.addListener(injectScript)

addHeartBeat()
injectTracking('GTM-P5PFGSF', window.document)

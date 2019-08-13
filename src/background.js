import { alarmReducer, initAlarms } from './background/alarm'
import { initIdentity } from './background/identity'
import { injectScript } from './background/inject'
import { reducer } from './background/message-reducer'
import { onNotificationClicked } from './background/notifications'
import { injectTracking } from './background/tracking'
import { composePromises } from './lib/async-helpers'
import {
  onMessage,
  alarms,
  webNavigation,
  notifications,
} from './lib/extension'
import { identify } from './lib/mujo-sdk'

const init = composePromises(initAlarms, identify, initIdentity)

notifications.onClicked.addListener(onNotificationClicked)
alarms.onAlarm.addListener(alarmReducer)
// NOTE: Most functionlity will probably stem from the reducer
onMessage(reducer)
webNavigation.onCommitted.addListener(injectScript)

init()
injectTracking('GTM-P5PFGSF', window.document)

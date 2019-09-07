/* eslint-disable */
import './background/pollyfill'
/* eslint-enable */

import React from 'react'
import ReactDOM from 'react-dom'
import { alarmReducer, initAlarms } from './background/alarm'
import { initIdentity } from './background/identity'
import { injectScript } from './background/inject'
import { reducer } from './background/message-reducer'
import { onNotificationClicked } from './background/notifications'
import { initTracking } from './background/tracking'
import { BackgroundApp } from './components/background-app'
import { composePromises } from './lib/async-helpers'
import {
  onMessage,
  alarms,
  webNavigation,
  notifications,
} from './lib/extension'
import { identify } from './lib/mujo-sdk'

const element = document.createElement('div')
const startReactApp = () => {
  ReactDOM.render(<BackgroundApp />, element)
}

const init = composePromises(
  initAlarms,
  initTracking(process.env.UA, window.document),
  identify,
  initIdentity,
  startReactApp
)

notifications.onClicked.addListener(onNotificationClicked)
alarms.onAlarm.addListener(alarmReducer)
// NOTE: Most functionlity will probably stem from the reducer
onMessage(reducer)
webNavigation.onCommitted.addListener(injectScript)

init()

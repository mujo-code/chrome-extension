/* eslint-disable */
import './background/pollyfill'
/* eslint-enable */

import { AsyncHelpers, Extension } from '@mujo/utils'
import React from 'react'
import ReactDOM from 'react-dom'
import { alarmReducer, initAlarms } from './background/alarm'
import { onBrowserAction } from './background/browser-action'
import { initIdentity } from './background/identity'
import { injectScript } from './background/inject'
import { reducer } from './background/message-reducer'
import { onNotificationClicked } from './background/notifications'
import { initTracking } from './background/tracking'
import { BackgroundApp } from './components/background-app'

const {
  onMessage,
  alarms,
  webNavigation,
  notifications,
  browserAction,
} = Extension
const { composePromises } = AsyncHelpers
const element = document.createElement('div')
const startReactApp = () => {
  ReactDOM.render(<BackgroundApp />, element)
}

const init = composePromises(
  initAlarms,
  initTracking(process.env.UA, window.document),
  initIdentity,
  startReactApp
)

notifications.onClicked.addListener(onNotificationClicked)
alarms.onAlarm.addListener(alarmReducer)
// NOTE: Most functionlity will probably stem from the reducer
onMessage(reducer)
webNavigation.onCommitted.addListener(injectScript)

// Called when the user clicks on the browser action.
browserAction.onClicked.addListener(onBrowserAction)

export default init()

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
import {
  initTracking,
  setupInitialTracker,
} from './background/tracking'
import { onInstall } from './background/install'
import { BackgroundApp } from './components/background-app'

const {
  onMessage,
  alarms,
  webNavigation,
  notifications,
  browserAction,
  runtime,
} = Extension
const { UA } = process.env
const { composePromises } = AsyncHelpers
const element = document.createElement('div')
const startReactApp = () => {
  ReactDOM.render(<BackgroundApp />, element)
}

const addExtensionListeners = () => {
  notifications.onClicked.addListener(onNotificationClicked)
  alarms.onAlarm.addListener(alarmReducer)
  onMessage(reducer)
  webNavigation.onCommitted.addListener(injectScript)
  browserAction.onClicked.addListener(onBrowserAction)
  runtime.onInstalled.addListener(onInstall)
}

const init = composePromises(
  initAlarms,
  initTracking(UA, window.document),
  initIdentity,
  startReactApp
)

setupInitialTracker(UA) // initial tracker only use for install events
addExtensionListeners()

export default init()

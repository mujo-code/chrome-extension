/* eslint-disable import-order-alphabetical/order */
import {
  onMessage,
  alarms,
  webNavigation,
  notifications,
} from './lib/extension'
import { wait } from './lib/async-helpers'

jest.mock('./background/alarm')
jest.mock('./background/tracking')
const { initAlarms } = require('./background/alarm')
const { injectTracking } = require('./background/tracking')

test('all the automatic setup of background', async () => {
  /* eslint-disable-next-line global-require */
  require('./background')
  expect(onMessage).toBeCalled()
  expect(alarms.onAlarm.addListener).toBeCalled()
  expect(webNavigation.onCommitted.addListener).toBeCalled()
  expect(notifications.onClicked.addListener).toBeCalled()
  expect(injectTracking).toBeCalled()
  await wait(400)
  // happens in a promise chain now so its deferred
  expect(initAlarms).toBeCalled()
})

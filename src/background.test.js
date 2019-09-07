/* eslint-disable import-order-alphabetical/order */
import {
  onMessage,
  alarms,
  webNavigation,
  notifications,
} from './lib/extension'
import { wait } from './lib/async-helpers'

jest.mock('./background/alarm')
jest.mock('universal-analytics')
const ua = require('universal-analytics')
const { initAlarms } = require('./background/alarm')

test('all the automatic setup of background', async () => {
  ua.mockReturnValue({ event: jest.fn(), screenview: jest.fn() })
  /* eslint-disable-next-line global-require */
  require('./background')
  expect(onMessage).toBeCalled()
  expect(alarms.onAlarm.addListener).toBeCalled()
  expect(webNavigation.onCommitted.addListener).toBeCalled()
  expect(notifications.onClicked.addListener).toBeCalled()
  await wait(400)
  // happens in a promise chain now so its deferred
  expect(initAlarms).toBeCalled()
  expect(ua).toBeCalled()
})

/* eslint-disable import-order-alphabetical/order */
import { Extension } from '@mujo/utils'

const {
  alarms,
  webNavigation,
  notifications,
  browserAction,
} = Extension
jest.mock('./background/alarm')
jest.mock('universal-analytics')
const ua = require('universal-analytics')
const { initAlarms } = require('./background/alarm')

beforeEach(() => {
  Extension.onMessage = jest.fn()
})

test('all the automatic setup of background', async () => {
  ua.mockReturnValue({ event: jest.fn(), screenview: jest.fn() })
  /* eslint-disable-next-line global-require */
  await require('./background').default
  expect(Extension.onMessage).toBeCalled()
  expect(alarms.onAlarm.addListener).toBeCalled()
  expect(webNavigation.onCommitted.addListener).toBeCalled()
  expect(notifications.onClicked.addListener).toBeCalled()
  expect(browserAction.onClicked.addListener).toBeCalled()

  // happens in a promise chain now so its deferred
  expect(initAlarms).toBeCalled()
  expect(ua).toBeCalled()
})

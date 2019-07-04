/* eslint-disable-next-line import-order-alphabetical/order */
import {
  onMessage,
  alarms,
  webNavigation,
  notifications,
} from './lib/extension'

jest.mock('./background/alarm')
jest.mock('./background/tracking')
const { addHeartBeat } = require('./background/alarm')
const { injectTracking } = require('./background/tracking')

test('all the automatic setup of background', () => {
  /* eslint-disable-next-line global-require */
  require('./background')
  expect(onMessage).toBeCalled()
  expect(alarms.onAlarm.addListener).toBeCalled()
  expect(webNavigation.onCommitted.addListener).toBeCalled()
  expect(notifications.onClicked.addListener).toBeCalled()
  expect(addHeartBeat).toBeCalled()
  expect(injectTracking).toBeCalled()
})

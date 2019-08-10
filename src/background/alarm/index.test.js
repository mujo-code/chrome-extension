/* eslint-disable import-order-alphabetical/order */
import { HEARTBEAT, ALARM_KEY } from '../../constants'
import { alarmReducer, initAlarms } from '.'

jest.mock('../notifications')
jest.mock('./heartbeat')
jest.mock('./prediction')
const { createNotification } = require('../notifications')
const { onHeartBeat, addHeartBeat } = require('./heartbeat')
const { checkPredictions } = require('./prediction')

test('reducer should call onHeartBeat when called with heartbeat', () => {
  const alarm = { name: HEARTBEAT }
  alarmReducer(alarm)
  expect(onHeartBeat).toBeCalled()
})

test('reducer should call createNotification when breakalarm fires', () => {
  const alarm = { name: ALARM_KEY }
  alarmReducer(alarm)
  expect(createNotification).toBeCalled()
})

test('initAlarms should call checkPredictions and addHeartBeat', () => {
  initAlarms()
  expect(checkPredictions).toBeCalled()
  expect(addHeartBeat).toBeCalled()
})

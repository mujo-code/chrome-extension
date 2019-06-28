/* eslint-disable import-order-alphabetical/order */
import { HEARTBEAT, ALARM_KEY } from '../../constants'
import { alarmReducer } from '.'

jest.mock('../notifications')
jest.mock('./heartbeat')
const { createNotification } = require('../notifications')
const { onHeartBeat } = require('./heartbeat')

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

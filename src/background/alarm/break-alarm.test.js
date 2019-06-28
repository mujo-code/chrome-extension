/* eslint-disable import-order-alphabetical/order */
import { ALARM_KEY } from '../../constants'
import { alarms } from '../../lib/extension'
import {
  removeBreakAlarm,
  addBreakAlarm,
  handleAlarmToggle,
} from './break-alarm'

jest.mock('./util')
const { upsertAlarm } = require('./util')

test('removeBreakAlarm should attempt to clear an alarm', () => {
  removeBreakAlarm()
  expect(alarms.clear).toBeCalledWith(ALARM_KEY)
})

test('addBreakAlarm should attempt to upsert an alarm', () => {
  addBreakAlarm()
  const delayInMinutes = 60 * 3 // three hours
  expect(upsertAlarm).toBeCalledWith(ALARM_KEY, { delayInMinutes })
})

test('handleAlarmToggle adds a break alarm if called with true', () => {
  handleAlarmToggle(true)
  expect(upsertAlarm).toBeCalled()
})

test('handleAlarmToggle removes a break alarm if called with false', () => {
  handleAlarmToggle(false)
  expect(alarms.clear).toBeCalled()
})

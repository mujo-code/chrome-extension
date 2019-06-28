/* eslint-disable import-order-alphabetical/order */
import { HEARTBEAT } from '../../constants'
import { onHeartBeat, addHeartBeat } from './heartbeat'

jest.mock('../activity')
jest.mock('./break-alarm')
jest.mock('./util')
const { isActive, resetUsage } = require('../activity')
const { removeBreakAlarm, addBreakAlarm } = require('./break-alarm')
const { upsertAlarm } = require('./util')

test('onHeartBeat should reset activity if user was inactive', async () => {
  isActive.mockResolvedValue(false)
  await onHeartBeat()
  expect(addBreakAlarm).not.toBeCalled()
  expect(resetUsage).toBeCalled()
  expect(removeBreakAlarm).toBeCalled()
})

test('onHeartBeat should call addBreakAlarm if user is active', async () => {
  isActive.mockResolvedValue(true)
  await onHeartBeat()
  expect(resetUsage).not.toBeCalled()
  expect(removeBreakAlarm).not.toBeCalled()
  expect(addBreakAlarm).toBeCalled()
})

test('addHeartBeat should attempt to add a new timer', async () => {
  await addHeartBeat()
  const periodInMinutes = 45
  expect(upsertAlarm).toBeCalledWith(HEARTBEAT, { periodInMinutes })
})

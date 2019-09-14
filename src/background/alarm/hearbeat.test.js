/* eslint-disable import-order-alphabetical/order */
import { HEARTBEAT } from '../../constants'
import { alarms } from '../../lib/extension'
import { onHeartBeat, addHeartBeat } from './heartbeat'

jest.mock('../activity')
jest.mock('./prediction')
const { isActive, resetUsage } = require('../activity')
const { checkPredictions } = require('./prediction')

test('onHeartBeat should reset activity if user was inactive', async () => {
  isActive.mockResolvedValue(false)
  await onHeartBeat()
  expect(checkPredictions).not.toBeCalled()
  expect(resetUsage).toBeCalled()
})

test('onHeartBeat should call addBreakAlarm if user is active', async () => {
  isActive.mockResolvedValue(true)
  await onHeartBeat()
  expect(resetUsage).not.toBeCalled()
  expect(checkPredictions).toBeCalled()
})

test('addHeartBeat should attempt to add a new timer', async () => {
  await addHeartBeat()
  const periodInMinutes = 45
  const options = { periodInMinutes }
  expect(alarms.upsertAlarm).toBeCalledWith(HEARTBEAT, options)
})

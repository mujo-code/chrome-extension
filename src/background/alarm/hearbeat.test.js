/* eslint-disable import-order-alphabetical/order */
import { HEARTBEAT } from '../../constants'
import { alarms } from '../../lib/extension'
import { onHeartBeat, addHeartBeat } from './heartbeat'

jest.mock('../activity')
const { isActive, resetUsage } = require('../activity')

test('onHeartBeat should reset activity if user was inactive', async () => {
  isActive.mockResolvedValue(false)
  await onHeartBeat()
  expect(resetUsage).toBeCalled()
})

test('onHeartBeat should call addBreakAlarm if user is active', async () => {
  isActive.mockResolvedValue(true)
  await onHeartBeat()
  expect(resetUsage).not.toBeCalled()
})

test('addHeartBeat should attempt to add a new timer', async () => {
  await addHeartBeat()
  const periodInMinutes = 45
  const options = { periodInMinutes }
  expect(alarms.upsertAlarm).toBeCalledWith(HEARTBEAT, options)
})

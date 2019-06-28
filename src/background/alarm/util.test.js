import { alarms } from '../../lib/extension'
import { getAlarm, upsertAlarm } from './util'

const callbackFN = ret => (...args) => args.pop().call(null, ret)

test('getAlarm should resolve to an alarm', () => {
  alarms.get.mockImplementation(callbackFN('bar'))
  expect(getAlarm('foo')).resolves.toBe('bar')
})

test('upsertAlarm should create an alarm', async () => {
  alarms.get.mockImplementation(callbackFN(null))
  alarms.create.mockResolvedValueOnce('bar')
  await upsertAlarm('bar')
  expect(alarms.create).toBeCalled()
})

test('upsertAlarm should not create a alarm if one exist', async () => {
  alarms.get.mockImplementation(callbackFN('foo'))
  alarms.create.mockResolvedValueOnce('bar')
  await upsertAlarm('bar')
  expect(alarms.create).not.toBeCalled()
})

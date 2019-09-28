import { alarms } from './extension'

const callbackFN = ret => (...args) => args.pop().call(null, ret)

test.skip('getAlarm should resolve to an alarm', () => {
  alarms.get = jest.fn().mockImplementation(callbackFN('bar'))
  expect(alarms.getAlarm('foo')).resolves.toBe('bar')
})

test.skip('upsertAlarm should create an alarm', async () => {
  alarms.get = jest.fn().mockImplementation(callbackFN(null))
  alarms.create = jest.fn().mockResolvedValueOnce('bar')
  await alarms.upsertAlarm('bar')
  expect(alarms.create).toBeCalled()
})

test.skip('upsertAlarm should not create a alarm if one exist', async () => {
  alarms.get = jest.fn().mockImplementation(callbackFN('foo'))
  alarms.create = jest.fn().mockResolvedValueOnce('bar')
  await alarms.upsertAlarm('bar')
  expect(alarms.create).not.toBeCalled()
})

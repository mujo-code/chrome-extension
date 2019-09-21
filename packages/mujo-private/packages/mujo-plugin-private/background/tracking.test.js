import { SITE_TIME_KEY } from '../constants'
import { updateScreenTime } from './screen-time'
import { storage } from './storage'

test('updateScreenTime should add url key', async () => {
  const url = 'https://foo.com/bar'
  const shortURL = 'https://foo.com'
  await storage.set(SITE_TIME_KEY, undefined)
  await updateScreenTime(url, [{ duration: 1 }])
  const screenTimes = await storage.get(SITE_TIME_KEY)
  expect(screenTimes[shortURL]).toBe(1)
})

test('updateScreenTime should update the time in storage', async () => {
  const url = 'https://foo.com/bar'
  const shortURL = 'https://foo.com'
  await storage.set(SITE_TIME_KEY, { [shortURL]: 1 })
  await updateScreenTime(url, [{ duration: 1 }, { duration: 2 }])
  const screenTimes = await storage.get(SITE_TIME_KEY)
  expect(screenTimes[shortURL]).toBe(4)
})

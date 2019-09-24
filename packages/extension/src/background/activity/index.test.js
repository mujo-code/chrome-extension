import {
  SITE_TIME_KEY,
  FOURTY_FIVE_MINUTES,
  LAST_ACTIVE_KEY,
  PAGE_VIEWS_KEY,
  ACTIVITY_NUMBER_KEY,
} from '../../constants'
import { storage } from '../storage'
import {
  getTotalSiteTime,
  isActive,
  updateActivityNumber,
  resetUsage,
  setLastActive,
  activityStatKeys,
} from '.'

test('getTotalSiteTime should calculate total site time', async () => {
  const times = { foo: 1, bar: 2, baz: 3 }
  await storage.set(SITE_TIME_KEY, times)
  expect(getTotalSiteTime()).resolves.toBe(6)
})

test('isActive should be true if user was just active', async () => {
  await storage.set(LAST_ACTIVE_KEY, +new Date())
  expect(isActive()).resolves.toBe(true)
})

test('isActive should be false if use was inactive for a while', async () => {
  await storage.set(
    LAST_ACTIVE_KEY,
    +new Date() - FOURTY_FIVE_MINUTES - 1
  )
  expect(isActive()).resolves.toBe(false)
})

test(`
  updateActivityNumber update storage based on page views and site times
`, async () => {
  const times = { foo: 1000 }
  const pageViews = 1
  await storage.set(SITE_TIME_KEY, times)
  await storage.set(PAGE_VIEWS_KEY, pageViews)
  await updateActivityNumber()
  // SEE math in function for more insight into number
  expect(storage.get(ACTIVITY_NUMBER_KEY)).resolves.toBe(3601)
})

test('resetUsage should reset some storage keys', async () => {
  const spy = jest.spyOn(storage, 'set')
  await resetUsage()
  expect(spy).toHaveBeenCalledTimes(activityStatKeys.length)
  spy.mockRestore()
})

test('setLastActive should set last active to current epoc', async () => {
  const now = new Date()
  const ts = +now

  await storage.set(LAST_ACTIVE_KEY, ts - 1)
  await setLastActive(now)
  return expect(storage.get(LAST_ACTIVE_KEY)).resolves.toBe(ts)
})

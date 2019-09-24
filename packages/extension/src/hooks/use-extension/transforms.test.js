import { decorateSelectedSegment, mapTopSites } from './transforms'

test('decorateSelectedSegment should do nothing if nothing is passed', () => {
  expect(decorateSelectedSegment({})).toBe(undefined)
})

test('decorateSelectedSegment should add more data to selectedSegment', () => {
  const originalURL = 'foo'
  const breakTimer = 'bar'
  const time = 'baz'
  const options = {
    selectedSegment: { urls: [originalURL] },
    siteTimesAndTimers: { [originalURL]: { breakTimer, time } },
  }
  decorateSelectedSegment(options)
  expect(options.selectedSegment.data).toEqual({
    breakTimer,
    time,
    originalURL,
  })
})

test('mapTopSites should map topSites with a isUsed key', () => {
  expect(mapTopSites([])({}).isUsed).toBe(false)
})

test('mapTopSites should add isUsed true if in used array', () => {
  const url = 'foo'
  expect(mapTopSites([{ url }])({ url }).isUsed).toBe(true)
})

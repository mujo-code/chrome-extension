import { shouldDisplayModal } from './util'

test('shouldDisplayModal should return false if nothing is passed', () => {
  expect(shouldDisplayModal()).toBe(false)
})

test('shouldDisplayModal should return false if no timer is passed', () => {
  expect(shouldDisplayModal(null, 1000)).toBe(false)
})

test('shouldDisplayModal should return false if timer not enabled', () => {
  expect(
    shouldDisplayModal({ enabled: false, time: 500 }, 1000)
  ).toBe(false)
})

test(`
  shouldDisplayModal should return false if timer time is not passed
`, () => {
  expect(
    shouldDisplayModal({ enabled: true, time: 1500 }, 1000)
  ).toBe(false)
})

test('shouldDisplayModal should return true if timer time is passed', () => {
  expect(shouldDisplayModal({ enabled: true, time: 500 }, 1000)).toBe(
    true
  )
})

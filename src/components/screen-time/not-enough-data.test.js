import { hasEnoughData } from './not-enough-data'

test('hasEnoughData should return true when there is enough data', () => {
  const segments = [{}, {}] // two segments
  const data = { foo: { time: 1000 * 61 } } // over a minute
  expect(hasEnoughData(segments, data)).toBe(true)
})

test('hasEnoughData should return false when there is not enough data', () => {
  // not enough segments
  expect(hasEnoughData([{}], { foo: { time: 1000 * 61 } })).toBe(
    false
  )
  // not enough time
  expect(hasEnoughData([{}, {}], { foo: { time: 1 } })).toBe(false)
})

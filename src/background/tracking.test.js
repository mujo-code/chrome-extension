/* eslint-disable import-order-alphabetical/order */
import * as Tracking from './tracking'

const { initTracking } = Tracking

jest.mock('universal-analytics')
const ua = require('universal-analytics')

test('initTracking should init "universal-analytics"', async () => {
  const tracker = {
    event: () => {},
    screenview: () => {},
  }
  ua.mockReset().mockReturnValue(tracker)
  const id = 'baz'
  const userId = 'qux'
  await initTracking(id)(userId)
  expect(ua).toBeCalledWith(id, userId)
})

import {
  angleToRadian,
  getCirclePoint,
  angleOfPercent,
  getPathAttributes,
  getLabelAttributes,
} from './attributes'

test('angleToRadian will convert and 360 degree angle to a radian', () => {
  expect(angleToRadian(180)).toBe(3.141592653589793)
})

test('getCirclePoint should return a function', () => {
  expect(typeof getCirclePoint([0, 0])).toBe('function')
})

test('getCirclePoint return should return a x y coord for the circle', () => {
  expect(getCirclePoint([0, 0], 1)(180)).toEqual({
    x: -1,
    y: 1.2246467991473532e-16,
  })
})

test('angleOfPercent should give you a 360° angle percent', () => {
  expect(angleOfPercent(0.5)).toBe(180)
})

test('getPathAttributes should generate path data with an arc', () => {
  const getInnerPoint = jest
    .fn()
    .mockReturnValueOnce({ x: 0, y: 0 })
    .mockReturnValueOnce({ x: 1, y: 1 })
  const angles = [1, 2]
  const radius = 30
  expect(
    getPathAttributes({ angles, getInnerPoint, radius })
  ).toEqual({ d: 'M 0 0 A 30 30 0 0 1 1 1' })
})

test('getPathAttributes should generate path data and flip arc flags', () => {
  const getInnerPoint = jest
    .fn()
    .mockReturnValueOnce({ x: 0, y: 0 })
    .mockReturnValueOnce({ x: 1, y: 1 })
  const angles = [500, 1000]
  const radius = 30
  expect(
    getPathAttributes({ angles, getInnerPoint, radius })
  ).toEqual({ d: 'M 0 0 A 30 30 0 1 1 1 1' })
})

test(`
  getLabelAttributes have a x, y, children, textAnchor,
  and alignmentBaseline properties
`, () => {
  const label = 'foo'
  const angles = [0, 1]
  const center = [0, 0]
  const getOuterPoint = jest
    .fn()
    .mockReturnValueOnce({ x: 10, y: 10 })
  const rotateGraph = 0
  expect(
    getLabelAttributes({
      angles,
      getOuterPoint,
      rotateGraph,
      center,
      label,
    })
  ).toEqual({
    children: label,
    x: 10,
    y: 10,
    textAnchor: 'start',
    alignmentBaseline: 'hanging',
  })
})

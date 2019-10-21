import { renderHook, act } from '@testing-library/react-hooks'
import { defaults } from './animation-steps'
import { useDotAnimation } from './use-dot-animation'

jest.mock('react-spring')
// eslint-disable-next-line import-order-alphabetical/order
const { useSpring } = require('react-spring')

test('useDotAnimation should step though animation json', () => {
  let onRest = null
  const set = jest.fn().mockImplementation(({ onRest: r }) => {
    onRest = r
  })
  set.id = 'foo'
  const setCurrentStep = jest.fn()
  const stop = jest.fn()
  const props = {}
  const json = [
    { scale: [1.6, 1], outerScale: [1.7, 1], duration: [10, 10] },
    { scale: [1.8, 1.1], outerScale: [1.9, 1.1], duration: [20, 20] },
  ]
  const onRenderEndCard = jest.fn()
  useSpring.mockImplementation(() => [props, set, stop])
  const { rerender } = renderHook(
    ({ currentStep }) =>
      useDotAnimation({
        json,
        isOpen: true,
        setCurrentStep,
        currentStep,
        onFinish: jest.fn(),
        onRenderEndCard,
        EndCard: jest.fn().mockImplementation(() => null),
        plays: 0,
        setPlays: jest.fn(),
      }),
    { initialProps: { currentStep: 0 } }
  )

  const step1 = set.mock.calls[0][0]
  expect(step1.scale).toBe(1.6)
  expect(step1.outerScale).toBe(1.7)
  expect(step1.config.duration).toBe(10)

  act(() => {
    onRest(step1)
    rerender({ currentStep: 1 })
  })

  const step2 = set.mock.calls[1][0]
  expect(step2.scale).toBe(1)
  expect(step2.outerScale).toBe(1)
  expect(step2.config.duration).toBe(10)

  act(() => {
    onRest(step2)
    rerender({ currentStep: 0 })
  })

  expect(json.length).toBe(1)
  const step3 = set.mock.calls[2][0]
  expect(step3.scale).toBe(1.8)
  expect(step3.outerScale).toBe(1.9)
  expect(step3.config.duration).toBe(20)

  act(() => {
    onRest(step3)
    rerender({ currentStep: 1 })
  })

  const step4 = set.mock.calls[3][0]
  expect(step4.scale).toBe(1.1)
  expect(step4.outerScale).toBe(1.1)
  expect(step4.config.duration).toBe(20)

  act(() => {
    onRest(step4)
    rerender({ currentStep: 0 })
  })

  const step5 = set.mock.calls[4][0]
  expect(step5.scale).toBe(defaults.scale)
  expect(step5.outerScale).toBe(defaults.outerScale)
  expect(step5.config.duration).toBe(defaults.breathTime)

  act(() => {
    onRest(step5)
  })

  // end card after full animation
  expect(onRenderEndCard).toBeCalled()
})

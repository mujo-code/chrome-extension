import { renderHook, act } from '@testing-library/react-hooks'
import { MAX_BREAKTIMER_MODAL, BREAK_TIMERS_KEY } from '../constants'
import model from '../model'
import { useExtension } from './use-extension'

test('the useExtension should return an array with two item', () => {
  const { result } = renderHook(() => useExtension())
  expect(result.current.length).toBe(2)
})

test('the useExtension should by default only allow 5 break timers', () => {
  model[BREAK_TIMERS_KEY].defaultValue = {
    foo: { enabled: true },
    bar: { enabled: true },
    baz: { enabled: true },
    qux: { enabled: true },
    foobar: { enabled: true },
  }
  const { result } = renderHook(() => useExtension())
  const { setBreakTimer } = result.current[1]
  act(() => {
    setBreakTimer('https://bazqux.com', 1, true)
  })
  const { breakTimers, upsellModal } = result.current[0]
  expect(Object.keys(breakTimers).length).toBe(5)
  expect(upsellModal.name).toBe(MAX_BREAKTIMER_MODAL)
  expect(upsellModal.url).toBe('bazqux.com')
  model[BREAK_TIMERS_KEY].defaultValue = {}
})

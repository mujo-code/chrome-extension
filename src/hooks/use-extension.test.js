import { renderHook, act } from '@testing-library/react-hooks'
import { MAX_BREAKTIMER_MODAL, BREAK_TIMERS_KEY } from '../constants'
import model from '../model'
import { useExtension, ExtensionProvider } from './use-extension'

const defaultOptions = { wrapper: ExtensionProvider }

test('the useExtension should return an object', () => {
  const { result } = renderHook(() => useExtension(), defaultOptions)
  expect(typeof result.current).toBe('object')
})

test('the useExtension should by default only allow 5 break timers', () => {
  model[BREAK_TIMERS_KEY].defaultValue = {
    foo: { enabled: true },
    bar: { enabled: true },
    baz: { enabled: true },
    qux: { enabled: true },
    foobar: { enabled: true },
  }
  const { result } = renderHook(() => useExtension(), defaultOptions)
  const { setBreakTimer } = result.current
  act(() => {
    setBreakTimer('https://bazqux.com', 1, true)
  })
  const { breakTimers, upsellModal } = result.current
  expect(Object.keys(breakTimers).length).toBe(5)
  expect(upsellModal.name).toBe(MAX_BREAKTIMER_MODAL)
  expect(upsellModal.url).toBe('bazqux.com')
  model[BREAK_TIMERS_KEY].defaultValue = {}
})

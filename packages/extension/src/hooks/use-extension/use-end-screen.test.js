import { renderHook, act } from '@testing-library/react-hooks'
import { useEndScreen } from './use-end-screen'

test('useEndScreen should allow you to register endscreens', () => {
  const endScreen = { endScreenType: 'foo', bar: 'baz' }
  const { result } = renderHook(() => useEndScreen())

  act(() => {
    result.current.registerEndScreen(endScreen)
  })
  // assert registered
  expect(result.current.lookupEndScreen('foo')).toEqual(endScreen)
  act(() => {
    result.current.removeEndScreen(endScreen)
  })
  // assert removed
  expect(result.current.lookupEndScreen('foo')).toEqual(undefined)
})

test('useEndScreen should return the latest register from the lookup', () => {
  const foo = { endScreenType: 'foo', bar: 'baz' }
  const bar = { endScreenType: 'foo', bar: 'qux' }
  const { result } = renderHook(() => useEndScreen())

  act(() => {
    result.current.registerEndScreen(foo)
    result.current.registerEndScreen(bar)
  })

  expect(result.current.lookupEndScreen('foo')).toEqual(bar)
})

test('useEndScreen should only remove the registered instance only', () => {
  const foo = { endScreenType: 'foo', bar: () => {} }
  const bar = { endScreenType: 'foo', bar: () => {} }
  const { result } = renderHook(() => useEndScreen())

  act(() => {
    result.current.registerEndScreen(foo)
    result.current.registerEndScreen(bar)
  })

  act(() => {
    result.current.removeEndScreen(bar)
  })

  expect(result.current.lookupEndScreen('foo')).toEqual(foo)
})

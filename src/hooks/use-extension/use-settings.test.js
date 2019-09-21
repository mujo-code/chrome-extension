import { renderHook } from '@testing-library/react-hooks'
import { useSettings } from './use-settings'

test('useSettings should have the initial state of no settings', () => {
  const { result } = renderHook(() => useSettings())
  expect(result.current.settings).toHaveLength(0)
})

test('useSettings should add a setting when pushSetting is called', () => {
  const { result } = renderHook(() => useSettings())
  const setting = { label: 'foo' }
  result.current.pushSetting(setting)
  expect(result.current.settings).toHaveLength(1)
  expect(result.current.settings[0]).toEqual(setting)
})

test('useSettings should remove a setting when removeSetting is called', () => {
  const { result } = renderHook(() => useSettings())
  const setting = { label: 'foo' }
  result.current.pushSetting(setting)
  result.current.removeSetting(setting)
  expect(result.current.settings).toHaveLength(0)
})

test('useSettings should update a setting when updateSetting is called', () => {
  const { result } = renderHook(() => useSettings())
  const setting = { label: 'foo' }
  result.current.pushSetting(setting)
  result.current.updateSetting({ ...setting, foo: 'bar' })
  expect(result.current.settings[0].foo).toBe('bar')
})

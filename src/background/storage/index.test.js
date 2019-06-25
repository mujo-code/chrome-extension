import { ALARM_KEY } from '../../constants'
import { onGetStorage, onSetStorage } from '.'

test('onGetStorage should get data from localStorage', () => {
  expect.assertions(2)
  localStorage.setItem(ALARM_KEY, true)
  onGetStorage(ALARM_KEY, ({ key, value }) => {
    expect(key).toBe(ALARM_KEY)
    expect(value).toBe(true)
  })
})

test('onSetStorage should set data from localStorage', () => {
  expect.assertions(3)
  localStorage.setItem(ALARM_KEY, false)
  onSetStorage(ALARM_KEY, true, ({ key, value }) => {
    expect(key).toBe(ALARM_KEY)
    expect(value).toBe(true)
    expect(localStorage.getItem(ALARM_KEY)).toBe('true')
  })
})

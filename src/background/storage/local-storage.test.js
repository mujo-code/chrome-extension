import localStorageInterface from './local-storage'
import { types } from './types'

// NOTE: most other functionality of this module is tests like ./types.test.js
test('localStorageInterface should have getters for all types', () => {
  types.forEach(type => {
    expect(typeof localStorageInterface.getters[type]).toBe(
      'function'
    )
  })
})

test('localStorageInterface should have setters for all types', () => {
  types.forEach(type => {
    expect(typeof localStorageInterface.setters[type]).toBe(
      'function'
    )
  })
})

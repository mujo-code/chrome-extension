import { set, create, toString } from './util'

test('set should assign a property to an object', () => {
  const data = {}
  set(data, 'foo', 'bar')
  expect(data.foo).toBe('bar')
})

test('create should make a new object from first param with new keys', () => {
  const data = { bar: 'baz' }
  const newData = create(data, 'foo', 'bar')
  expect(newData).toEqual({ foo: 'bar', bar: 'baz' })
})

test('toString should convert first param to string', () => {
  expect(toString(true)).toBe('true')
})

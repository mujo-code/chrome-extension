import {
  noop,
  compose,
  pipe,
  identity,
  from,
  curry,
  first,
  last,
  capitalize,
  pascalize,
} from './functional'

test('noop should be a none operational function', () => {
  expect(noop()).toBe(undefined)
})

test('compose should combine two or more functions', () => {
  const addOne = x => x + 1
  const toString = x => `${x}`
  const composedFn = compose(
    toString,
    addOne
  )
  expect(composedFn(1)).toBe('2')
})

test('pipe should combine two or more functions in reverse to compose', () => {
  const addOne = x => x + 1
  const toString = x => `${x}`
  const composedFn = pipe(
    toString,
    addOne
  )
  expect(composedFn(1)).toBe('11')
})

test('identity should return the value passed in', () => {
  expect(identity(true)).toBe(true)
})

test('from should create a new instance of the first param', () => {
  class Foo {}
  const fooFrom = from(Foo)
  expect(fooFrom()).toBeInstanceOf(Foo)
})

test('curry should return a function until all arguments are passed', () => {
  const add = curry((x, y) => x + y)
  const addOne = add(1)
  expect(typeof addOne).toBe('function')
  expect(addOne(1)).toBe(2)
  expect(add(1, 2)).toBe(3)
})

test('first should return the first item in an array', () => {
  const arr = ['foo', 'bar']
  expect(first(arr)).toBe('foo')
  expect(arr.length).toBe(2)
})

test('last should return the last item in an array', () => {
  const arr = ['foo', 'bar', 'baz']
  expect(last(arr)).toBe('baz')
  expect(arr.length).toBe(3)
})

test('capitalize first letter', () => {
  expect(capitalize('letter')).toBe('Letter')
})

test('pascalize word', () => {
  expect(pascalize('letter-word')).toBe('letterWord')
})

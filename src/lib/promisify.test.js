import {
  promisify,
  promisifyNode,
  promisifyObject,
} from './promisify'

test('promisify should resolve first callback arg', async () => {
  const foo = (arg1, fn) => fn(arg1)
  const bar = promisify(foo)
  const result = await bar('baz')

  expect(result).toBe('baz')
})

test('promisifyNode should resolve second callback arg', async () => {
  const foo = (arg1, fn) => fn(null, arg1)
  const bar = promisifyNode(foo)
  const result = await bar('baz')

  expect(result).toBe('baz')
})

test('promisifyNode should reject if it has a first arg', async () => {
  const foo = (arg1, fn) => fn(new Error('foo'), arg1)
  const bar = promisifyNode(foo)
  let err
  try {
    await bar('baz')
  } catch (e) {
    err = e
  }

  expect(err.message).toBe('foo')
})

test('promisifyObject should promisify an object', async () => {
  const foo = {
    bar: fn => fn('bar'),
    baz: (arg, fn) => fn('baz'),
  }
  const qux = promisifyObject(foo)
  const barResult = await qux.bar()
  const bazResult = await qux.baz('foo')

  expect(barResult).toBe('bar')
  expect(bazResult).toBe('baz')
})

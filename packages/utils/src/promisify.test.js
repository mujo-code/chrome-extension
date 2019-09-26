import {
  promisify,
  promisifyNode,
  promisifyObject,
  promisifyOptions,
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

test('promisifyObject should not throw we not object is passed', async () => {
  let error = null
  try {
    promisifyObject()
  } catch (e) {
    error = e
  }
  expect(error).toBe(null)
})

test('promisifyObject should promisify an object', async () => {
  const foo = {
    bar: fn => fn('bar'),
    baz: (arg, fn) => fn('baz'),
    qux: 'qux',
  }
  const qux = promisifyObject(foo)
  const barResult = await qux.bar()
  const bazResult = await qux.baz('foo')

  expect(barResult).toBe('bar')
  expect(bazResult).toBe('baz')
})

test('promisifyOptions should resolve the success keys args', async () => {
  const foo = options => options.success('foo')
  const result = await promisifyOptions(foo, {})
  expect(result).toBe('foo')
})

test('promisifyOptions should reject the failure keys args', async () => {
  const foo = options => options.failure('bar')
  let error
  try {
    await promisifyOptions(foo, {})
  } catch (e) {
    error = e
  }
  expect(error).toBe('bar')
})

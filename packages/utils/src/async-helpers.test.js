import { wait, defer, composePromises, pipePromises } from './async-helpers'

test('wait should wait pause a function execution', async () => {
  const timeout = 0
  const fn = jest.fn()
  const foo = async () => {
    await wait(timeout)
    fn()
  }
  await foo()
  expect(fn).toBeCalled()
})

test('defer should pause a function passed in execution', async () => {
  const timeout = 0
  const fn = jest.fn()
  await defer(fn, timeout, 'foo')
  expect(fn).toBeCalledWith('foo')
})

test('composePromises sequentially exec promises in reverse', async () => {
  const first = jest.fn().mockResolvedValue('foo')
  const second = jest.fn().mockResolvedValue('bar')
  const third = jest.fn().mockResolvedValue('baz')
  const fn = composePromises(third, second, first)
  const ret = await fn('qux')
  expect(first).toBeCalledWith('qux')
  expect(second).toBeCalledWith('foo')
  expect(third).toBeCalledWith('bar')
  expect(ret).toBe('baz')
})

test('pipePromises sequentially exec promises', async () => {
  const first = jest.fn().mockResolvedValue('foo')
  const second = jest.fn().mockResolvedValue('bar')
  const third = jest.fn().mockResolvedValue('baz')
  const fn = pipePromises(first, second, third)
  const ret = await fn('qux')
  expect(first).toBeCalledWith('qux')
  expect(second).toBeCalledWith('foo')
  expect(third).toBeCalledWith('bar')
  expect(ret).toBe('baz')
})

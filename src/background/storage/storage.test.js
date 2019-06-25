import { identity } from '../../lib/functional'
import { set } from '../../lib/util'
import { Storage } from './storage'

test('Storage.from should create a new instance of Storage', () => {
  expect(Storage.from({})).toBeInstanceOf(Storage)
})

test('Storage::get should access key from storageInterface', async () => {
  const storageInterface = { getters: { string: identity } }
  const model = { foo: { type: String } }
  const storage = Storage.from({ model, storageInterface })
  const value = await storage.get('foo')
  expect(value).toBe('foo')
})

test('Storage::set should access key from storageInterface', async () => {
  const data = {}
  const setData = (key, value) => set(data, key, value)
  const storageInterface = { setters: { string: setData } }
  const model = { foo: { type: String } }
  const storage = Storage.from({ model, storageInterface })
  await storage.set('foo', 'bar')
  expect(data.foo).toBe('bar')
})

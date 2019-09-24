/* eslint-disable import-order-alphabetical/order */
import { ID_KEY } from '../constants'
import { initIdentity } from './identity'

jest.mock('./storage')
const { storage } = require('./storage')

beforeEach(() => {
  storage.get = jest.fn()
  storage.set = jest.fn()
})

test('initIdentity should fetch the identity from storage', async () => {
  await initIdentity()
  expect(storage.get).toBeCalledWith(ID_KEY)
})

test('initIdentity create an identity if there is none', async () => {
  storage.get.mockResolvedValue(undefined)
  const id = await initIdentity()
  expect(storage.set).toBeCalledWith(ID_KEY, id)
})

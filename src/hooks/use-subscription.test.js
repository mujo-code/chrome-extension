import { renderHook, act } from '@testing-library/react-hooks'
import { useSubscription } from './use-subscription'

jest.mock('../lib/payment')
/* eslint-disable-next-line import-order-alphabetical/order */
const { getPurchases, getProducts, buy } = require('../lib/payment')

beforeEach(() => {
  getPurchases.mockReset()
  getProducts.mockReset()
  buy.mockReset()
})

test('useSubscription should initialize products and purchases', async () => {
  getPurchases.mockResolvedValue(['foo'])
  getProducts.mockResolvedValue(['foo', 'bar'])
  const { result, waitForNextUpdate } = renderHook(() =>
    useSubscription()
  )
  // Two updates [product, user]
  await waitForNextUpdate()
  await waitForNextUpdate()
  expect(result.current.user.isSubscribed).toBe(true)
  expect(result.current.user.products).toEqual(['foo'])
  expect(result.current.products).toEqual(['foo', 'bar'])
})

test('useSubscription should get purchases after calling buy', async () => {
  getPurchases.mockResolvedValue([])
  getProducts.mockResolvedValue(['foo', 'bar'])
  buy.mockResolvedValue(true)
  const { result, waitForNextUpdate } = renderHook(() =>
    useSubscription()
  )
  // Init calls
  await waitForNextUpdate()
  await waitForNextUpdate()
  expect(result.current.user.isSubscribed).toBe(false)
  expect(result.current.user.products).toEqual([])
  // mock purchase again with purchased value
  getPurchases.mockReset().mockResolvedValue(['foo'])
  act(() => {
    result.current.buy('foo')
  })
  // Update calls
  await waitForNextUpdate()
  await waitForNextUpdate()
  expect(result.current.user.isSubscribed).toBe(true)
  expect(result.current.user.products).toEqual(['foo'])
  expect(result.current.products).toEqual(['foo', 'bar'])
})

test('useSubscription a failure to buy should set purchaseError', async () => {
  getPurchases.mockResolvedValue([])
  getProducts.mockResolvedValue([])
  buy.mockRejectedValue(new Error('fail'))
  const { result, waitForNextUpdate } = renderHook(() =>
    useSubscription()
  )
  // Init calls
  await waitForNextUpdate()
  await waitForNextUpdate()
  act(() => {
    result.current.buy('foo')
  })
  // Update error
  await waitForNextUpdate()
  expect(result.current.purchaseError.message).toBe('fail')
})

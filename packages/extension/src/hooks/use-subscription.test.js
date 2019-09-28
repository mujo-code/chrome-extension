import { Payment } from '@mujo/utils'
import { renderHook, act } from '@testing-library/react-hooks'
import { ACTIVE_PRODUCT, CANCELLED_PRODUCT } from '../constants'
import {
  useSubscription,
  activeProducts,
  SubscriptionProvider,
} from './use-subscription'

const hookOptions = { wrapper: SubscriptionProvider }

beforeEach(() => {
  global.google = {
    payments: {
      inapp: {
        getSkuDetails: jest.fn(),
        buy: jest.fn(),
        getPurchases: jest.fn(),
      },
    },
  }
  Payment.getPurchases = jest.fn()
  Payment.buy = jest.fn()
  Payment.getProducts = jest.fn()
})

test('activeProduct should filter to only active products', () => {
  const products = [
    { state: ACTIVE_PRODUCT },
    { state: CANCELLED_PRODUCT },
  ]
  expect(activeProducts(products)).toHaveLength(1)
})

test('useSubscription should initialize products and purchases', async () => {
  Payment.getPurchases.mockResolvedValue([{ state: ACTIVE_PRODUCT }])
  Payment.getProducts.mockResolvedValue(['foo', 'bar'])
  const { result, waitForNextUpdate } = renderHook(
    () => useSubscription(),
    hookOptions
  )
  // Two updates [product, user]
  await waitForNextUpdate()
  await waitForNextUpdate()
  expect(result.current.user.isSubscribed).toBe(true)
  expect(result.current.user.products).toEqual([
    { state: ACTIVE_PRODUCT },
  ])
  expect(result.current.products).toEqual(['foo', 'bar'])
})

test('useSubscription should be unsubbed if not active product', async () => {
  Payment.getPurchases.mockResolvedValue([
    { state: CANCELLED_PRODUCT },
  ])
  Payment.getProducts.mockResolvedValue(['foo', 'bar'])
  const { result, waitForNextUpdate } = renderHook(
    () => useSubscription(),
    hookOptions
  )
  // Two updates [product, user]
  await waitForNextUpdate()
  await waitForNextUpdate()
  expect(result.current.user.isSubscribed).toBe(false)
})

test('useSubscription a failure to buy should set purchaseError', async () => {
  Payment.getPurchases.mockResolvedValue([])
  Payment.getProducts.mockResolvedValue([])
  Payment.buy.mockRejectedValue(new Error('fail'))
  const { result, waitForNextUpdate } = renderHook(
    () => useSubscription(),
    hookOptions
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

import { getProducts, getPurchases, buy } from './payment'

beforeEach(() => {
  // mock google api
  window.google = {
    payments: {
      inapp: {
        getSkuDetails: jest.fn(),
        getPurchases: jest.fn(),
        buy: jest.fn(),
      },
    },
  }
})

test('getProducts should resolve a list of products', async () => {
  const products = [
    {
      kind: 'chromewebstore#inAppProduct',
      sku: 'foo',
      item_id: 'foo',
      type: 'inapp',
      state: 'ACTIVE',
      prices: [
        {
          valueMicros: '990000',
          currencyCode: 'USD',
          regionCode: 'US',
        },
      ],
      localeData: [
        {
          title: 'Foo',
          description: 'Foo bar baz',
          languageCode: 'all',
        },
      ],
    },
  ]
  const mockResponse = {
    response: {
      details: {
        kind: 'chromewebstore#inAppProductList',
        inAppProducts: products,
      },
    },
  }
  window.google.payments.inapp.getSkuDetails.mockImplementation(options =>
    options.success(mockResponse)
  )
  const results = await getProducts()
  expect(results).toEqual(products)
  expect(window.google.payments.inapp.getSkuDetails).toBeCalled()
})

test('getPurchases should resolve a list of products', async () => {
  const purchases = [
    {
      kind: 'chromewebstore#inAppProduct',
      sku: 'foo',
      item_id: 'foo',
      type: 'inapp',
      state: 'ACTIVE',
    },
  ]
  const mockResponse = { response: { details: purchases } }
  window.google.payments.inapp.getPurchases.mockImplementation(options =>
    options.success(mockResponse)
  )
  const results = await getPurchases()
  expect(results).toEqual(purchases)
  expect(window.google.payments.inapp.getPurchases).toBeCalled()
})

test('buy should pass the sku to the google api', async () => {
  const mockResponse = {
    jwt: 'foo',
    request: { cartId: 'foo' },
    response: { orderId: 'foo' },
  }
  window.google.payments.inapp.buy.mockImplementation(options =>
    options.success(mockResponse)
  )
  const results = await buy('bar')
  expect(results).toEqual(mockResponse)
  const arg = window.google.payments.inapp.buy.mock.calls[0][0]
  expect(arg.sku).toBe('bar')
})

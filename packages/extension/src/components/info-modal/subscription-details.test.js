import { i18n } from '../../i18n'
import { subscriptionDetails } from './subscription-details'

const t = i18n.t.bind(i18n)

const stampSubDetails = isSub => ({
  user: { isSubscriber: isSub, products: [] },
  products: [],
  getProduct: jest.fn(),
  buy: jest.fn(),
})

test('subscriptionDetails should return error when no product is found', () => {
  const context = {}
  const subDetails = stampSubDetails()
  const options = { t }
  expect(
    subscriptionDetails(context, subDetails, options).title
  ).toMatch('Unable to subscribe')
})

test('subscriptionDetails should return detail when there is a product', () => {
  const context = {}
  const subDetails = stampSubDetails()
  const options = { t }
  subDetails.getProduct.mockReturnValue({
    sku: 'foo',
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
  })
  expect(
    subscriptionDetails(context, subDetails, options).button.children
  ).toMatch('$0.99/mo') // correct pricing format
})

test('subscriptionDetails should call buy when button is clicked', async () => {
  const context = { sku: 'foo', callback: jest.fn() }
  const subDetails = stampSubDetails()
  const changeModal = jest.fn()
  subDetails.getProduct.mockReturnValue({
    sku: 'foo',
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
  })
  subDetails.buy.mockResolvedValue(true)
  const options = { changeModal, t }
  const modal = subscriptionDetails(context, subDetails, options)
  await modal.button.onClick()
  expect(subDetails.buy).toBeCalledWith('foo')
  expect(context.callback).toBeCalled()
  expect(changeModal).toBeCalled()
})

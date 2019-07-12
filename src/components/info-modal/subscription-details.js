import React from 'react'
import { CURRENT_SUB_SKU } from '../../constants'
import { first } from '../../lib/functional'
import { PurchaseError } from './purchase-error'

// const mockProduct = {
//   kind: 'chromewebstore#inAppProduct',
//   sku: 'foo',
//   item_id: 'foo',
//   type: 'inapp',
//   state: 'ACTIVE',
//   prices: [
//     {
//       valueMicros: '990000',
//       currencyCode: 'USD',
//       regionCode: 'US',
//     },
//   ],
//   localeData: [
//     {
//       title: 'Foo',
//       description: 'Foo bar baz',
//       languageCode: 'all',
//     },
//   ],
// }

export const subscriptionDetails = (context, subDetails) => {
  const sku = context.sku || CURRENT_SUB_SKU
  const product = subDetails.getProduct(sku)

  if (!product) {
    // TODO: logging monitoring
    return {
      title: 'Unable to subscribe at this time',
      description: ['Please contact support'],
    }
  }

  const price = first(product.prices)
  const formatter = new Intl.NumberFormat(price.regionCode, {
    style: 'currency',
    currency: price.currencyCode,
  })
  const purchaseError = subDetails.purchaseError ? (
    <PurchaseError
      marginBottom="zero"
      error={subDetails.purchaseError}
    />
  ) : null
  const noSubDescription = [
    'Thanks for considering supporting Mujō with a subscription.',
    'Your support helps keep the extension running and supported.',
    'By purchasing a subscription you get access to:',
  ]
  const description = subDetails.user.isSubscriber
    ? ['You are already a subscriber', 'You have access to:']
    : noSubDescription
  return {
    title: <>Subscription Details {purchaseError}</>,
    description: [
      description.join(' '),
      'Unlimited break timers.',
      'Intellgent algorithm to notify you when to take a break.',
      'Early access to advanced features.',
    ],
    button: {
      children: `Subscribe at ${formatter.format(
        price.valueMicros / 1000 / 100
      )}/mo`,
      onClick: () => {
        subDetails.buy(sku)
      },
    },
  }
}

import { Functional } from '@mujo/utils'
import React from 'react'
import { CURRENT_SUB_SKU, SUB_SUCCESS_MODAL } from '../../constants'
import { PurchaseError } from './purchase-error'

const { first, noop } = Functional

export const subscriptionDetails = (
  context,
  subDetails,
  { changeModal, t }
) => {
  const sku = context.sku || CURRENT_SUB_SKU
  const callback = context.callback || noop
  const product = subDetails.getProduct(sku)

  if (!product) {
    // TODO: logging monitoring
    return {
      title: t('unable-to-sub'),
      description: [t('contact-questions')],
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
      t={t}
    />
  ) : null
  const description = subDetails.user.isSubscriber
    ? t('sub-access')
    : t('purchase-consider')
  const cost = formatter.format(price.valueMicros / 1000 / 1000)
  return {
    title: <>Subscription Details {purchaseError}</>,
    description: [
      description,
      t('unlimited-break-timers'),
      t('smart-break-times'),
      t('early-access'),
    ],
    button: {
      children: t('sub-at', { cost }),
      onClick: async () => {
        await subDetails.buy(sku)
        changeModal({ name: SUB_SUCCESS_MODAL })
        callback() // set initial action
      },
    },
  }
}

import {
  MAX_BREAKTIMER_MODAL,
  SUB_DETAILS_MODAL,
  SUB_SUCCESS_MODAL,
} from '../../constants'
import { identity } from '../../lib/functional'
import { maxBreaktimers } from './max-breaktimers'
import { subscriptionDetails } from './subscription-details'
import { subscriptionSuccess } from './subscription-success'

const modals = {
  [MAX_BREAKTIMER_MODAL]: maxBreaktimers,
  [SUB_DETAILS_MODAL]: subscriptionDetails,
  [SUB_SUCCESS_MODAL]: subscriptionSuccess,
}

export const getModalData = (context, subDetails, options) => {
  const modalData = modals[context.name] || identity
  return modalData(context, subDetails, options)
}

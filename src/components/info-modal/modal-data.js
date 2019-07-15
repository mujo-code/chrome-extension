import {
  MAX_BREAKTIMER_MODAL,
  SUB_DETAILS_MODAL,
} from '../../constants'
import { identity } from '../../lib/functional'
import { maxBreaktimers } from './max-breaktimers'
import { subscriptionDetails } from './subscription-details'

const modals = {
  [MAX_BREAKTIMER_MODAL]: maxBreaktimers,
  [SUB_DETAILS_MODAL]: subscriptionDetails,
}

export const getModalData = (context, subDetails) => {
  const modalData = modals[context.name] || identity
  return modalData(context, subDetails)
}

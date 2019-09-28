import { Functional } from '@mujo/utils'
import {
  MAX_BREAKTIMER_MODAL,
  SUB_DETAILS_MODAL,
  SUB_SUCCESS_MODAL,
  SETTINGS_MODAL,
} from '../../constants'
import { maxBreaktimers } from './max-breaktimers'
import { settingsModal } from './settings'
import { subscriptionDetails } from './subscription-details'
import { subscriptionSuccess } from './subscription-success'

const { identity } = Functional
const modals = {
  [MAX_BREAKTIMER_MODAL]: maxBreaktimers,
  [SUB_DETAILS_MODAL]: subscriptionDetails,
  [SUB_SUCCESS_MODAL]: subscriptionSuccess,
  [SETTINGS_MODAL]: settingsModal,
}

export const getModalData = (context = {}, subDetails, options) => {
  const modalData = modals[context.name] || identity
  return modalData(context, subDetails, options)
}

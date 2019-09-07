import {
  SUB_DETAILS_MODAL,
  CURRENT_SUB_SKU,
  SUPPORT_URL,
  BREATH_MIN,
  BREATH_MAX,
  WEBSTORE_URL,
} from '../../constants'
import { VERSION } from '../../env'

export const useSettings = ({
  user,
  setUpsellModal,
  alarmEnabled,
  setAlarmEnabled,
  hasPermission,
  requestPermissions,
  removePermissions,
  breathAmount,
  setBreathAmount,
  t,
}) => [
  {
    label: t('subscribe'),
    type: 'button',
    value: t('more-info'),
    alt: user.isSubscribed
      ? t('thanks-support')
      : t('get-more-access'),
    setter: () => {
      // always open this modal
      setUpsellModal({
        name: SUB_DETAILS_MODAL,
        sku: CURRENT_SUB_SKU,
        callback: () => {},
      })
    },
  },
  {
    label: t('reminder'),
    type: 'boolean',
    alt: t('reminder-alt'),
    setter: enabled => setAlarmEnabled(enabled),
    value: alarmEnabled,
  },
  {
    label: t('screen-time-enabled'),
    type: 'boolean',
    alt: t('screen-time-permissions'),
    setter: () => {
      if (hasPermission) {
        removePermissions()
      } else {
        requestPermissions()
      }
    },
    value: hasPermission,
  },
  {
    label: t('breath-amount'),
    type: 'number',
    alt: t('want-more-breath'),
    inputLabel: t('breath-limits', {
      min: BREATH_MIN,
      max: BREATH_MAX,
    }),
    setter: amount => {
      setBreathAmount(
        Math.min(Math.max(amount, BREATH_MIN), BREATH_MAX)
      )
    },
    value: breathAmount,
  },
  {
    label: t('help'),
    alt: t('join-chat'),
    type: 'button',
    value: t('get-support'),
    setter: () => {
      window.open(SUPPORT_URL)
    },
  },
  {
    label: t('about-mujo'),
    alt: t('mujo-version', { version: VERSION }),
    type: 'button',
    value: t('rate-us'),
    setter: () => {
      window.open(WEBSTORE_URL)
    },
  },
]

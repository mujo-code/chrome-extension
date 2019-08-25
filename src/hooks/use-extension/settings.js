import {
  SUB_DETAILS_MODAL,
  CURRENT_SUB_SKU,
  SUPPORT_URL,
  BREATH_MIN,
  BREATH_MAX,
  WEBSTORE_URL,
} from '../../constants'
import { VERSION } from '../../env'

const REMINDER_ALT = 'Notifications that remind you to take a break'

export const makeSettings = ({
  user,
  setUpsellModal,
  alarmEnabled,
  setAlarmEnabled,
  hasPermission,
  requestPermissions,
  removePermissions,
  breathAmount,
  setBreathAmount,
}) => [
  {
    label: 'Subscribe',
    type: 'button',
    value: 'More Info',
    alt: user.isSubscribed
      ? 'Thanks you for your support ❤️!'
      : 'Get access to more Mujō',
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
    label: 'Reminder',
    type: 'boolean',
    alt: REMINDER_ALT,
    setter: enabled => setAlarmEnabled(enabled),
    value: alarmEnabled,
  },
  {
    label: 'Screen Time Enabled',
    type: 'boolean',
    alt: 'Screen Time requires some additional permissions',
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
    label: 'Breath amount',
    type: 'number',
    alt: 'Want more breath in each break?',
    inputLabel: `Between ${BREATH_MIN} to ${BREATH_MAX}`,
    setter: amount => {
      setBreathAmount(
        Math.min(Math.max(amount, BREATH_MIN), BREATH_MAX)
      )
    },
    value: breathAmount,
  },
  {
    label: 'Help',
    alt: 'Need help or got feedback? Talk to us on Spectrum.chat',
    type: 'button',
    value: 'Get support',
    setter: () => {
      window.open(SUPPORT_URL)
    },
  },
  {
    label: 'About Mujō',
    alt: `You are using Mujō v${VERSION}`,
    type: 'button',
    value: 'Rate us!',
    setter: () => {
      window.open(WEBSTORE_URL)
    },
  },
]

import {
  SUB_DETAILS_MODAL,
  CURRENT_SUB_SKU,
  SUPPORT_URL,
} from '../../constants'

const REMINDER_ALT = 'Notifications that remind you to take a break'

export const makeSettings = ({
  user,
  setUpsellModal,
  alarmEnabled,
  setAlarmEnabled,
  hasPermission,
  requestPermissions,
  removePermissions,
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
    label: 'Help',
    alt: 'Need help or got feedback? Talk to us on Spectrum.chat',
    type: 'button',
    value: 'Get support',
    setter: () => {
      window.open(SUPPORT_URL)
    },
  },
]

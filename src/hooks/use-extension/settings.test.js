import {
  SUB_DETAILS_MODAL,
  CURRENT_SUB_SKU,
  SUPPORT_URL,
} from '../../constants'
import { i18n } from '../../i18n'
import { first } from '../../lib/functional'
import { useSettings } from './settings'

const t = i18n.t.bind(i18n)

const findSettingByLabel = (label, settings) =>
  first(settings.filter(s => s.label === label))

test('useSettings should return a collection of objects', () => {
  const settings = useSettings({ user: {}, t })
  expect(Array.isArray(settings)).toBe(true)
  settings.forEach(setting => {
    expect(typeof setting).toBe('object')
  })
})

test('subcribe setting should open a subscribe modal when clicked', () => {
  const setUpsellModal = jest.fn()
  const user = { isSubscribed: false }
  const settings = useSettings({ setUpsellModal, user, t })
  const subSetting = findSettingByLabel('Subscribe', settings)
  subSetting.setter()
  const arg = setUpsellModal.mock.calls[0][0]
  const { name, sku } = arg
  expect(setUpsellModal).toBeCalled()
  expect(name).toBe(SUB_DETAILS_MODAL)
  expect(sku).toBe(CURRENT_SUB_SKU)
})

test('subcribe setting should show love to subscribers', () => {
  const setUpsellModal = jest.fn()
  const user = { isSubscribed: true }
  const settings = useSettings({ setUpsellModal, user, t })
  const subSetting = findSettingByLabel('Subscribe', settings)
  expect(subSetting.alt).toMatch('❤️')
})

test('reminder setting should set the opposite reminder value', () => {
  const setAlarmEnabled = jest.fn()
  const settings = useSettings({
    alarmEnabled: true,
    setAlarmEnabled,
    user: {},
    t,
  })
  const reminderSetting = findSettingByLabel('Reminder', settings)
  reminderSetting.setter(false)
  expect(setAlarmEnabled).toBeCalledWith(false)
})

test('screen time setting should request permissions on click', () => {
  const requestPermissions = jest.fn()
  const settings = useSettings({
    hasPermission: false,
    requestPermissions,
    user: {},
    t,
  })
  const screenTimeSetting = findSettingByLabel(
    'Screen Time Enabled',
    settings
  )
  screenTimeSetting.setter(false)
  expect(requestPermissions).toBeCalled()
})

test('screen time setting should remove permissions on click', () => {
  const removePermissions = jest.fn()
  const settings = useSettings({
    hasPermission: true,
    removePermissions,
    user: {},
    t,
  })
  const screenTimeSetting = findSettingByLabel(
    'Screen Time Enabled',
    settings
  )
  screenTimeSetting.setter(false)
  expect(removePermissions).toBeCalled()
})

test('help setting should navigate to support on click', () => {
  global.open = jest.fn()
  const settings = useSettings({ user: {}, t })
  const helpSetting = findSettingByLabel('Help', settings)
  helpSetting.setter(false)
  expect(global.open).toBeCalledWith(SUPPORT_URL)
})

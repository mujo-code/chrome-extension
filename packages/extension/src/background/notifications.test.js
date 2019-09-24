/* eslint-disable import-order-alphabetical/order */
import { ALARM_KEY } from '../constants'
import { notifications, tabs } from '../lib/extension'
import {
  createNotification,
  onNotificationClicked,
} from './notifications'
import { storage } from './storage'

jest.mock('./tracking')
const { track } = require('./tracking')

test('createNotification should create a notification if enabled', async () => {
  const id = 'foo'
  notifications.create.mockReturnValue(id)
  await storage.set(ALARM_KEY, true)
  await createNotification()
  expect(notifications.create).toBeCalled()
  expect(track).toBeCalledWith({
    category: 'notification',
    action: 'sent',
    label: id,
    value: 'Take a break',
  })
})

test(`
  createNotification should not create a notification when not enabled
`, async () => {
  await storage.set(ALARM_KEY, false)
  await createNotification()
  expect(notifications.create).not.toBeCalled()
})

test('onNotificationClicked should open a tab if clicked', () => {
  const id = 'foo'
  const newTab = { url: 'chrome://newtab?play=true' }
  onNotificationClicked(id)
  expect(notifications.clear).toBeCalledWith(id)
  expect(tabs.create).toBeCalledWith(newTab)
})

/*
  Extension Lib Mock
*/
import model from '../../model'

const stampEvent = () => ({
  addListener: jest.fn(),
  removeListener: jest.fn(),
})

export const getStorageFn = async key => model[key].defaultValue
export const setStorageFn = async (key, value) => value

export const message = jest.fn().mockResolvedValue({})
export const getStorage = jest.fn().mockImplementation(getStorageFn)
export const setStorage = jest.fn().mockImplementation(setStorageFn)
export const onMessage = jest.fn()

export const alarms = {
  get: jest.fn(),
  create: jest.fn(),
  clear: jest.fn(),
  onAlarm: stampEvent(),
}
export const notifications = {
  create: jest.fn(),
  clear: jest.fn(),
  onClicked: stampEvent(),
}
export const tabs = {
  create: jest.fn(),
  onRemoved: stampEvent(),
  sendMessage: jest.fn(),
}
export const webNavigation = { onCommited: stampEvent() }
export const runtime = {}
export const topSites = { get: jest.fn() }

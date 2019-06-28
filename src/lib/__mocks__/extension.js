/*
  Extension Lib Mock
*/
import model from '../../model'

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
}
export const notifications = {}
export const tabs = {}
export const webNavigation = {}
export const runtime = {}
export const topSites = { get: jest.fn() }

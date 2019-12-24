import browser from 'webextension-polyfill'
import { GET_STORAGE, SET_STORAGE } from './constants'

/*
  Extension Lib
  -----
  Essentially a way to abstract away chrome bits
  to eventually allow for bits like firefox without large refactors
*/

window.browser = browser

export const {
  alarms,
  i18n,
  permissions,
  runtime,
  notifications,
  tabs,
  webNavigation,
  topSites,
  browserAction,
  extension,
} = browser

export const message = async (event, data) => {
  const payload = { event, ...(data || {}) }
  const response = await browser.runtime.sendMessage(payload)
  if (response.error) {
    throw response.error
  }
  return response
}

export const getStorage = async key => {
  const response = await message(GET_STORAGE, { key })
  return response.value
}

export const setStorage = async (key, value) => {
  const response = await message(SET_STORAGE, { key, value })
  return response.value
}

export const onMessage = (...args) => {
  runtime.onMessage.addListener(...args)
}

const getAlarm = browser.alarms.get
const upsertAlarm = async (name, alarmInfo) => {
  const alarm = await getAlarm(name)
  if (alarm) return Promise.resolve(null)
  return chrome.alarms.create(name, alarmInfo)
}

Object.defineProperty(alarms, 'getAlarm', { value: getAlarm })
Object.defineProperty(alarms, 'upsertAlarm', { value: upsertAlarm })

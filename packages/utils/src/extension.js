import { useCallback } from 'react'
import { GET_STORAGE, SET_STORAGE } from './constants'
import { promisifyObject } from './promisify'
/*
  Extension Lib
  -----
  Essentially a way to abstract away chrome bits
  to eventually allow for bits like firefox without large refactors
*/

export const message = async (event, data) =>
  new Promise((resolve, reject) => {
    const payload = { event, ...(data || {}) }
    chrome.runtime.sendMessage(payload, (response = {}) => {
      if (response.error) {
        reject(response.error)
        return
      }
      resolve(response)
    })
  })

export const getStorage = async key => {
  const response = await message(GET_STORAGE, { key })
  return response.value
}

export const setStorage = async (key, value) => {
  const response = await message(SET_STORAGE, { key, value })
  return response.value
}

export const onMessage = (...args) => {
  chrome.runtime.onMessage.addListener(...args)
}

export const permissions = promisifyObject(chrome.permissions)

const getAlarm = key =>
  new Promise(resolve => {
    chrome.alarms.get(key, alarm => {
      resolve(alarm)
    })
  })

const upsertAlarm = async (name, alarmInfo) => {
  const alarm = await getAlarm(name)
  if (alarm) return
  chrome.alarms.create(name, alarmInfo)
}

export const alarms = {
  ...chrome.alarms,
  getAlarm,
  upsertAlarm,
}

export const capitalize = word => word[0].toUpperCase() + word.slice(1)

export const pascalize = key => {
  const splitKey = key.split('-')
  if (splitKey.length === 1) {
    return key
  }
  const firstElement = splitKey[0]
  const transform = splitKey.slice(1).map(value => capitalize(value))
  return firstElement + transform.join('')
}

export const useTranslation = () => ({
  t: key => {
    const convert = pascalize(key)
    return useCallback(chrome.i18n.getMessage(convert), [])
  },
})

// TODO add mapping for "t"
export const i18n = { ...chrome.i18n }

export const {
  notifications,
  tabs,
  webNavigation,
  runtime,
  topSites,
  browserAction,
} = chrome

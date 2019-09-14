import { GET_STORAGE, SET_STORAGE } from '../constants'
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
    chrome.runtime.sendMessage(payload, (response = {}, ...args) => {
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

const upsertAlarm = async (key, ...args) => {
  const alarm = await getAlarm(key)
  if (alarm) return
  chrome.alarms.create(key, ...args)
}

export const alarms = {
  ...chrome.alarms,
  getAlarm,
  upsertAlarm,
}

export const {
  notifications,
  tabs,
  webNavigation,
  runtime,
  topSites,
} = chrome

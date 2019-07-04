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
    const payload = Object.assign({ event }, data || {})
    chrome.runtime.sendMessage(payload, (response = {}, ...args) => {
      console.log([response], args)
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

export const {
  alarms,
  notifications,
  tabs,
  webNavigation,
  runtime,
  topSites,
} = chrome

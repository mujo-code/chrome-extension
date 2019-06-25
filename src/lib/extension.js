/*
  Extension Lib
  -----
  Essentially a way to abstract away chrome bits
  to eventually allow for bits like firefox without large refactors
*/

export const message = (event, data) =>
  chrome.runtime.sendMessage(Object.assign({ event }, data || {}))

export const onMessage = (...args) => {
  chrome.runtime.onMessage.addListener(...args)
}

export const {
  alarms,
  notifications,
  tabs,
  webNavigation,
  runtime,
} = chrome

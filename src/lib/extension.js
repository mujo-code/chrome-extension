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

export const alarms = new Proxy(chrome.alarms)
export const notifications = new Proxy(chrome.notifications)
export const tabs = new Proxy(chrome.tabs)
export const webNavigation = new Proxy(chrome.webNavigation)

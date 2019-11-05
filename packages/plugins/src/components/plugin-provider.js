import React from 'react'

export const context = React.createContext()
const { Provider } = context

/*
  Plugin Provider
  -------
  This provider is going to accept some common tool inside of the
  extensions to allow the plugins to have access to common functionality
  within the app with out exposing it to window or something else gross

  env            - the environment in the extension (background | content | ntp)
  extension      - sugar sytax extension of browser api's
  storage        - access to the database
  config         - configuration for the extension
  model          - data structure for db
  constants      - constants variables defined in the extension

  Background only props

  changeEmitter  - storage updates propgated to hooks
  messageEmitter - event emmiter for messages
  alarms         - a way to listen to heartbeat ticks
  track          - a function to track with google analytics

  New tab page only props

  tabs           - some functions and state for tabs
  settings       - some functions and state for settings
  endScreen      - some functions to allow plugins to hook into the endscreen
*/

export const PluginProvider = ({
  env,
  extension,
  storage,
  config,
  changeEmitter,
  messageEmitter,
  constants,
  alarms,
  model,
  children,
  tabs,
  settings,
  isActive,
  track,
}) => (
  <Provider
    value={{
      env,
      extension,
      storage,
      config,
      changeEmitter,
      messageEmitter,
      constants,
      alarms,
      model,
      tabs,
      settings,
      isActive,
      track,
    }}
  >
    {children}
  </Provider>
)

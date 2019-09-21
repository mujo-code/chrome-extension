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
  changeEmitter  - ( bg only ) storage updates propgated to hooks
  messageEmitter - ( bg only ) event emmiter for messages
  alarms         - ( bg only ) a way to listen to heartbeat ticks
  model          - data structure for db
  constants      - constants variables defined in the extension
  tabs           - ( ntp only ) some functions and state for tabs
  settings       - ( ntp only ) some functions and state for settings
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
    }}
  >
    {children}
  </Provider>
)

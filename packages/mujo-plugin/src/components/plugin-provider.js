import React from 'react'

export const context = React.createContext()
const { Provider } = context

/*
  Plugin Provider
  -------
  This provider is going to accept some common tool inside of the
  extensions to allow the plugins to have access to common functionality
  within the app with out exposing it to window or something else gross

  env       - the environment in the extension (background | content | ntp)
  extension - sugar sytax extension of browser api's
  storage   - access to the database
  config    - configuration for the extension
*/

export const PluginProvider = ({ env, extension, storage, config }) => (
  <Provider value={{ env, extension, storage, config }}></Provider>
)

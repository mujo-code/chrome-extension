import { PluginProvider as Provider } from '@mujo/plugins'
import { Extension } from '@mujo/utils'
import React from 'react'
import * as constants from '../../constants'
import { useExtension } from '../../hooks/use-extension'
import { i18n } from '../../i18n'
import model from '../../model'

// client plugin providers
export const NTPProvider = props => {
  const {
    pushTab,
    currentTab,
    removeTab,
    pushSetting,
    removeSetting,
    updateSetting,
  } = useExtension()
  const tabs = { pushTab, removeTab, currentTab }
  const settings = { pushSetting, removeSetting, updateSetting }
  return <Provider {...props} tabs={tabs} settings={settings} />
}

export const PluginProvider = ({ children, env }) => {
  const props = {
    env,
    extension: {
      ...Extension,
      i18n: { ...Extension.i18n, t: i18n.t.bind(i18n) },
    },
    constants,
    tabs: {},
    settings: {},
    model,
  }
  // add additional info for ntp
  return env === 'ntp' ? (
    <NTPProvider {...props}>{children}</NTPProvider>
  ) : (
    <Provider {...props}>{children}</Provider>
  )
}

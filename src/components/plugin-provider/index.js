import { PluginProvider as Provider } from '@mujo/plugins'
import React from 'react'
import * as constants from '../../constants'
import { useExtension } from '../../hooks/use-extension'
import { i18n } from '../../i18n'
import * as extension from '../../lib/extension'
import model from '../../model'

// NOTE we use a proxy to allow for access to `useExtension`
export const NTPPluginProvider = ({ children }) => {
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
  const props = {
    env: 'ntp',
    extension: {
      ...extension,
      i18n: { ...extension.i18n, t: i18n.t.bind(i18n) },
    },
    constants,
    tabs,
    settings,
    model,
  }
  return <Provider {...props}>{children}</Provider>
}

import { PluginProvider as Provider } from '@mujo/plugins'
import React from 'react'
import * as constants from '../../constants'
import { useExtension } from '../../hooks/use-extension'
import * as extension from '../../lib/extension'

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
    extension,
    constants,
    tabs,
    settings,
  }
  return <Provider {...props}>{children}</Provider>
}

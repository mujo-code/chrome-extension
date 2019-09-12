import { PluginProvider as Provider } from '@mujo/plugins'
import React from 'react'
import * as constants from '../../constants'
import { useExtension } from '../../hooks/use-extension'
import * as extension from '../../lib/extension'

export const NTPPluginProvider = ({ children }) => {
  const { pushTab, currentTab, removeTab } = useExtension()
  const tabbing = { pushTab, removeTab, currentTab }
  const value = {
    env: 'ntp',
    extension,
    constants,
    tabbing,
  }
  return <Provider value={value}>{children}</Provider>
}

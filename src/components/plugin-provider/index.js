import { PluginProvider as Provider } from '@mujo/plugins'
import React from 'react'
import * as constants from '../../constants'
import { useExtension } from '../../hooks/use-extension'
import * as extension from '../../lib/extension'

// NOTE we use a proxy to allow for access to `useExtension`
export const NTPPluginProvider = ({ children }) => {
  const { pushTab, currentTab, removeTab } = useExtension()
  const tabs = { pushTab, removeTab, currentTab }
  const props = {
    env: 'ntp',
    extension,
    constants,
    tabs,
  }
  return <Provider {...props}>{children}</Provider>
}

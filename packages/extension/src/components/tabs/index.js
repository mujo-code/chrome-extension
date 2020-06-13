import { Box } from '@mujo/ui'
import React from 'react'
import { useExtension } from '../../hooks/use-extension'
import { Tab } from './tab'

export const Tabs = () => {
  const { tabs, currentTab, selectTab } = useExtension()

  return (
    <Box display="flex" flexDirection="row">
      {tabs.map(name => (
        <Tab
          key={name}
          label={name}
          selected={name === currentTab}
          onClick={() => {
            selectTab(name)
          }}
        />
      ))}
    </Box>
  )
}

import { Box } from '@mujo/box'
import React from 'react'
import { useExtension } from '../../hooks/use-extension'
import { Tab } from './tab'

export const Tabs = () => {
  const { tabs, currentTab, selectTab } = useExtension()

  return (
    <Box display="flex" direction="row">
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

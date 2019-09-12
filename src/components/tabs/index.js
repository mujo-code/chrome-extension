import { Box } from '@mujo/box'
import { IngressTarget } from '@mujo/ingress'
import React from 'react'
import { TABS_TARGET } from '../../constants'
import { useExtension } from '../../hooks/use-extension'

export const Tab = ({ label, selected, onClick }) => (
  <Box
    paddingLeft="m"
    paddingRight="m"
    whiteSpace="nowrap"
    onClick={onClick}
  >
    {label}
  </Box>
)

export const TabsTarget = () => <IngressTarget id={TABS_TARGET} />

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

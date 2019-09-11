import { Box } from '@mujo/box'
import { Ingress, IngressTarget } from '@mujo/ingress'
import React, { useEffect } from 'react'
import { useExtension } from '../../hooks/use-extension'

const TABS_TARGET = 'tabs'

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

export const TabContent = ({ name, children }) => {
  const { pushTab, removeTab, currentTab } = useExtension()

  useEffect(() => {
    pushTab(name)
    return removeTab(name)
  }, [name])

  if (name !== currentTab) return null
  return <Ingress target={TABS_TARGET}>{children}</Ingress>
}

export const TabTarget = () => <IngressTarget id={TABS_TARGET} />

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
